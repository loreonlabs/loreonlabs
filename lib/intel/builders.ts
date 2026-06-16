import "server-only";

import * as gh from "@/lib/api/github";
import { HttpError } from "@/lib/api/client";
import {
  ECOSYSTEMS,
  ecosystemById,
  themeById,
  ALL_CURATED_BUILDERS,
  curatedBySlug,
  CURATED_TEAMS,
  teamProjectHref,
  type CuratedBuilder,
} from "./config";
import { intel, type Intel } from "./result";
import { formatCompact } from "@/lib/format";

/** Run an async map with limited concurrency (avoids API rate-limit bursts). */
async function mapPool<T, R>(items: T[], size: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(...(await Promise.all(items.slice(i, i + size).map(fn))));
  }
  return out;
}

/**
 * Builder intelligence — REAL people discovered from the live contributor
 * graphs of each ecosystem's official repositories (no hardcoded individuals).
 * The leaderboards rank builders by real GitHub metrics only — never invented
 * influence scores.
 */

export interface IntelBuilder {
  login: string;
  name?: string;
  avatarUrl: string;
  github: string;
  contributions: number;
  ecosystems: string[];
  /** Number of tracked repos this person contributes to (cross-project reach). */
  repoCount: number;
  featured?: boolean;
  // Hydrated from the profile (only populated for leaderboards / detail).
  followers?: number;
  publicRepos?: number;
  createdAt?: string;
}

export type BuilderSort = "contributions" | "name";

async function contributorBuilders(ecosystem?: string): Promise<IntelBuilder[]> {
  const ecosystems = ecosystem ? ECOSYSTEMS.filter((e) => e.id === ecosystem) : ECOSYSTEMS;

  const repoTasks = ecosystems.flatMap((e) => e.seedRepos.map((full) => ({ full, ecosystem: e.id })));
  const results = (
    await mapPool(repoTasks, 4, async ({ full, ecosystem: eid }) => {
      const [owner, repo] = full.split("/");
      const contributors = await gh.getContributors(owner, repo, 25).catch(() => []);
      return contributors.map((c) => ({ c, ecosystem: eid, repo: full }));
    })
  ).flat();

  const byLogin = new Map<string, IntelBuilder & { repos: Set<string> }>();
  for (const { c, ecosystem: eid, repo } of results) {
    const existing = byLogin.get(c.login);
    if (existing) {
      existing.contributions += c.contributions;
      if (!existing.ecosystems.includes(eid)) existing.ecosystems.push(eid);
      existing.repos.add(repo);
    } else {
      byLogin.set(c.login, {
        login: c.login,
        avatarUrl: c.avatarUrl,
        github: c.url,
        contributions: c.contributions,
        ecosystems: [eid],
        repoCount: 1,
        repos: new Set([repo]),
      });
    }
  }
  return [...byLogin.values()]
    .filter((b) => !b.login.includes("[bot]") && !/bot$/i.test(b.login))
    .map(({ repos, ...b }) => ({ ...b, repoCount: repos.size }));
}

function unavatar(x: string): string {
  return `https://unavatar.io/x/${x}`;
}

/** Curated personalities, hydrated from GitHub when a login is available. */
async function featuredBuilders(ecosystem?: string): Promise<IntelBuilder[]> {
  const curated = ALL_CURATED_BUILDERS.filter((b) => !ecosystem || b.ecosystems.includes(ecosystem));
  const builders = await mapPool(curated, 5, async (c): Promise<IntelBuilder> => {
    if (c.github) {
      const u = await gh.getUser(c.github).catch(() => null);
      if (u) {
        return {
          login: c.slug,
          name: c.name,
          avatarUrl: u.avatarUrl,
          github: u.url,
          contributions: u.followers,
          ecosystems: c.ecosystems,
          repoCount: u.publicRepos,
          featured: true,
          followers: u.followers,
          publicRepos: u.publicRepos,
          createdAt: u.createdAt,
        };
      }
    }
    // No GitHub (or fetch failed) → X-based card with a real avatar.
    return {
      login: c.slug,
      name: c.name,
      avatarUrl: c.x ? unavatar(c.x) : "",
      github: c.x ? `https://x.com/${c.x}` : c.website ?? "",
      contributions: 0,
      ecosystems: c.ecosystems,
      repoCount: 0,
      featured: true,
    };
  });
  return builders;
}

/** Lightweight builder list (no profile hydration) — used by embeds. */
export async function listBuilders(
  opts: { ecosystem?: string; sort?: BuilderSort } = {},
): Promise<Intel<IntelBuilder[]>> {
  return intel<IntelBuilder[]>({
    empty: [],
    run: async () => {
      const [featured, contributors] = await Promise.all([
        featuredBuilders(opts.ecosystem),
        contributorBuilders(opts.ecosystem),
      ]);
      const featuredLogins = new Set(featured.map((b) => b.login));
      const rest = contributors.filter((b) => !featuredLogins.has(b.login));
      const sort = opts.sort ?? "contributions";
      rest.sort((a, b) =>
        sort === "name" ? a.login.localeCompare(b.login) : b.contributions - a.contributions,
      );
      return [...featured, ...rest].slice(0, 120);
    },
  });
}

/* --------------------------- leaderboards --------------------------- */

async function hydrate(builders: IntelBuilder[]): Promise<IntelBuilder[]> {
  // Batched to avoid bursting GitHub's secondary rate limits.
  return mapPool(builders, 5, async (b) => {
    if (b.followers != null) return b; // already hydrated (featured)
    const u = await gh.getUser(b.login).catch(() => null);
    if (!u) return b;
    return {
      ...b,
      name: b.name ?? u.name ?? u.login,
      followers: u.followers,
      publicRepos: u.publicRepos,
      createdAt: u.createdAt,
    };
  });
}

export type BoardId = "featured" | "top" | "referenced" | "connected" | "active" | "rising";

export interface BoardEntry {
  builder: IntelBuilder;
  value: string;
}

export interface Board {
  id: BoardId;
  label: string;
  description: string;
  entries: BoardEntry[];
}

const FOUR_YEARS = 4 * 365 * 24 * 60 * 60 * 1000;

export async function getBuilderBoards(ecosystem?: string): Promise<Intel<Board[]>> {
  return intel<Board[]>({
    empty: [],
    isEmpty: (v) => v.length === 0 || v.every((b) => b.entries.length === 0),
    run: async () => {
      const [featured, contributors] = await Promise.all([
        featuredBuilders(ecosystem),
        contributorBuilders(ecosystem),
      ]);
      const featuredLogins = new Set(featured.map((b) => b.login));
      const merged = [
        ...featured,
        ...contributors.filter((b) => !featuredLogins.has(b.login)),
      ].sort((a, b) => b.contributions - a.contributions);

      const hydrated = await hydrate(merged.slice(0, 18));
      const withFollowers = hydrated.filter((b) => b.followers != null);
      const now = Date.now();

      const boards: Board[] = [
        {
          id: "featured",
          label: "Featured Builders",
          description: "Notable founders and operators",
          entries: featured.slice(0, 8).map((b) => ({
            builder: b,
            value: b.followers != null ? `${formatCompact(b.followers)} followers` : "Featured",
          })),
        },
        {
          id: "top",
          label: "Top Builders",
          description: "By contributions to tracked repos",
          entries: [...hydrated]
            .sort((a, b) => b.contributions - a.contributions)
            .slice(0, 8)
            .map((b) => ({ builder: b, value: `${formatCompact(b.contributions)} commits` })),
        },
        {
          id: "referenced",
          label: "Most Referenced",
          description: "By GitHub followers",
          entries: [...withFollowers]
            .sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0))
            .slice(0, 8)
            .map((b) => ({ builder: b, value: `${formatCompact(b.followers ?? 0)} followers` })),
        },
        {
          id: "active",
          label: "Most Active",
          description: "By public repositories",
          entries: [...hydrated.filter((b) => b.publicRepos != null)]
            .sort((a, b) => (b.publicRepos ?? 0) - (a.publicRepos ?? 0))
            .slice(0, 8)
            .map((b) => ({ builder: b, value: `${formatCompact(b.publicRepos ?? 0)} repos` })),
        },
        {
          id: "connected",
          label: "Most Connected",
          description: "By projects connected across the ecosystem",
          entries: [...hydrated]
            .sort((a, b) => b.repoCount - a.repoCount || b.contributions - a.contributions)
            .slice(0, 8)
            .map((b) => ({ builder: b, value: `${b.repoCount} project${b.repoCount === 1 ? "" : "s"}` })),
        },
        {
          id: "rising",
          label: "Rising Builders",
          description: "Newer accounts with strong activity",
          entries: [...hydrated.filter((b) => b.createdAt && now - Date.parse(b.createdAt) < FOUR_YEARS)]
            .sort((a, b) => b.contributions - a.contributions)
            .slice(0, 8)
            .map((b) => ({ builder: b, value: `joined ${new Date(b.createdAt as string).getFullYear()}` })),
        },
      ];
      return boards.filter((b) => b.entries.length > 0);
    },
  });
}

/* ----------------------------- detail ------------------------------ */

export type BuilderType = "github" | "curated-x" | "curated";

export interface BuilderDetail {
  profile: gh.Developer;
  repos: gh.Repository[];
  ecosystemIds: string[];
  ecosystemNames: string[];
  totalStars: number;
  relatedBuilders: IntelBuilder[];
  relatedNarratives: { id: string; name: string }[];
  /** Detected builder type. */
  type: BuilderType;
  /** Whether this builder has a curated profile (role, ecosystem, teams). */
  isCurated: boolean;
  /** True when real GitHub data was fetched (so stats are meaningful). */
  hasLiveGithub: boolean;
  /** Curated projects/teams this person belongs to (for non-GitHub builders). */
  relatedProjects: { name: string; href: string }[];
}

/** Synthesize a profile for a curated X-only builder (no GitHub). */
function syntheticDeveloper(c: CuratedBuilder): gh.Developer {
  return {
    login: c.slug,
    name: c.name,
    bio: c.role,
    avatarUrl: c.x ? `https://unavatar.io/x/${c.x}` : "",
    url: c.x ? `https://x.com/${c.x}` : c.website ?? "",
    followers: 0,
    publicRepos: 0,
    company: c.role,
    website: c.website ?? null,
    twitter: c.x ?? null,
    location: null,
    createdAt: "",
  };
}

/**
 * Minimal profile from a GitHub login when the live fetch is unavailable
 * (e.g. rate-limited). The avatar resolves from github.com/<login>.png, which
 * needs no API — so the profile is still real and the page never 404s.
 */
function minimalDeveloper(login: string, c?: CuratedBuilder): gh.Developer {
  return {
    login,
    name: c?.name ?? login,
    bio: c?.role ?? null,
    avatarUrl: `https://github.com/${login}.png`,
    url: `https://github.com/${login}`,
    followers: 0,
    publicRepos: 0,
    company: c?.role ?? null,
    website: c?.website ?? null,
    twitter: c?.x ?? null,
    location: null,
    createdAt: "",
  };
}

/**
 * Resolve a builder across ALL sources (GitHub-discovered + curated). Never
 * 404s on a transient GitHub failure — only when a non-curated slug genuinely
 * does not exist on GitHub.
 */
export async function getBuilder(slug: string): Promise<Intel<BuilderDetail | null>> {
  const curated = curatedBySlug(slug);

  return intel<BuilderDetail | null>({
    empty: null,
    isEmpty: (v) => v == null,
    run: async () => {
      // GitHub login to try: curated.github, or the slug itself (unless the
      // curated entry is explicitly X-only).
      const ghLogin = curated?.github ?? (curated ? undefined : slug);

      let profile: gh.Developer | null = null;
      let repos: gh.Repository[] = [];
      let liveGithub = false;

      if (ghLogin) {
        try {
          profile = await gh.getUser(ghLogin);
          liveGithub = true;
          repos = await gh.listUserRepos(ghLogin, 12).catch(() => []);
        } catch (err) {
          // A real 404 for a non-curated slug → genuine not-found.
          if (err instanceof HttpError && err.status === 404 && !curated) {
            return null;
          }
          // Otherwise (rate limit / transient) → fall back to a minimal profile.
          profile = null;
        }
      }

      if (!profile) {
        profile =
          curated && !curated.github
            ? syntheticDeveloper(curated)
            : minimalDeveloper(ghLogin ?? slug, curated);
      } else if (curated) {
        profile.name = curated.name;
        if (curated.x) profile.twitter = curated.x;
        if (curated.role) profile.company = curated.role;
        if (curated.website && !profile.website) profile.website = curated.website;
      }

      const derived = ECOSYSTEMS.filter((e) => repos.some((r) => r.topics.includes(e.githubTopic)));
      const ecosystemIds = curated?.ecosystems.length ? curated.ecosystems : derived.map((e) => e.id);
      const primary = ecosystemIds[0] ?? "base";

      const related = await listBuilders({ ecosystem: primary });
      const relatedBuilders = related.data.filter((b) => b.login !== slug).slice(0, 6);

      const narrativeIds = ecosystemById(primary)?.narrativeIds ?? [];
      const relatedNarratives = narrativeIds
        .map((nid) => themeById(nid))
        .filter((t): t is NonNullable<typeof t> => Boolean(t))
        .slice(0, 6)
        .map((t) => ({ id: t.id, name: t.name }));

      // Builder type — never inferred from X; GitHub only when explicit.
      const type: BuilderType =
        curated?.github || !curated ? "github" : curated.x ? "curated-x" : "curated";

      // Curated teams/projects this person belongs to (pure curated data).
      const relatedProjects = CURATED_TEAMS.filter((t) =>
        t.contributors.some((c) => !c.isAccount && c.x.toLowerCase() === slug.toLowerCase()),
      ).map((t) => ({ name: t.name, href: teamProjectHref(t) }));

      return {
        profile,
        repos,
        ecosystemIds,
        ecosystemNames: ecosystemIds.map((id) => ecosystemById(id)?.name ?? id).slice(0, 4),
        type,
        isCurated: Boolean(curated),
        hasLiveGithub: liveGithub,
        relatedProjects,
        totalStars: repos.reduce((sum, r) => sum + r.stars, 0),
        relatedBuilders,
        relatedNarratives,
      };
    },
  });
}
