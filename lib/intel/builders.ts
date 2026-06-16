import "server-only";

import * as gh from "@/lib/api/github";
import { ECOSYSTEMS } from "./config";
import { intel, type Intel } from "./result";

/**
 * Builder intelligence — REAL people from GitHub. Lists are the most active
 * contributors of each ecosystem's core repositories, plus curated featured
 * builders (verifiable handles only). Profiles hydrate live on the detail page.
 */

export interface IntelBuilder {
  login: string;
  name?: string;
  avatarUrl: string;
  github: string;
  contributions: number;
  ecosystems: string[];
  featured?: boolean;
}

export type BuilderSort = "contributions" | "name";

async function contributorBuilders(ecosystem?: string): Promise<IntelBuilder[]> {
  const ecosystems = ecosystem
    ? ECOSYSTEMS.filter((e) => e.id === ecosystem)
    : ECOSYSTEMS;

  const tasks = ecosystems.flatMap((e) =>
    e.seedRepos.map(async (full) => {
      const [owner, repo] = full.split("/");
      const contributors = await gh.getContributors(owner, repo, 12).catch(() => []);
      return contributors.map((c) => ({ c, ecosystem: e.id }));
    }),
  );
  const results = (await Promise.all(tasks)).flat();

  const byLogin = new Map<string, IntelBuilder>();
  for (const { c, ecosystem: eid } of results) {
    const existing = byLogin.get(c.login);
    if (existing) {
      existing.contributions += c.contributions;
      if (!existing.ecosystems.includes(eid)) existing.ecosystems.push(eid);
    } else {
      byLogin.set(c.login, {
        login: c.login,
        avatarUrl: c.avatarUrl,
        github: c.url,
        contributions: c.contributions,
        ecosystems: [eid],
      });
    }
  }
  return [...byLogin.values()].filter((b) => !b.login.includes("[bot]"));
}

/** Curated, verifiable featured builders (hydrated live from GitHub). */
async function featuredBuilders(ecosystem?: string): Promise<IntelBuilder[]> {
  const ecosystems = ecosystem
    ? ECOSYSTEMS.filter((e) => e.id === ecosystem)
    : ECOSYSTEMS;
  const pairs = ecosystems.flatMap((e) =>
    e.featuredBuilders.map((login) => ({ login, ecosystem: e.id })),
  );
  const seen = new Set<string>();
  const builders = await Promise.all(
    pairs
      .filter((p) => (seen.has(p.login) ? false : seen.add(p.login)))
      .map(async ({ login, ecosystem: eid }): Promise<IntelBuilder | null> => {
        const u = await gh.getUser(login).catch(() => null);
        if (!u) return null;
        return {
          login: u.login,
          name: u.name ?? u.login,
          avatarUrl: u.avatarUrl,
          github: u.url,
          contributions: u.followers,
          ecosystems: [eid],
          featured: true,
        };
      }),
  );
  return builders.filter((b): b is IntelBuilder => b != null);
}

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
        sort === "name"
          ? a.login.localeCompare(b.login)
          : b.contributions - a.contributions,
      );

      return [...featured, ...rest].slice(0, 36);
    },
  });
}

export interface BuilderDetail {
  profile: gh.Developer;
  repos: gh.Repository[];
  ecosystemNames: string[];
  totalStars: number;
}

export async function getBuilder(login: string): Promise<Intel<BuilderDetail | null>> {
  return intel<BuilderDetail | null>({
    empty: null,
    isEmpty: (v) => v == null,
    run: async () => {
      const profile = await gh.getUser(login);
      const repos = await gh.listUserRepos(login, 12).catch(() => []);
      const ecosystemNames = ECOSYSTEMS.filter((e) =>
        repos.some((r) => r.topics.includes(e.githubTopic)),
      )
        .map((e) => e.name)
        .slice(0, 4);
      const totalStars = repos.reduce((sum, r) => sum + r.stars, 0);
      return { profile, repos, ecosystemNames, totalStars };
    },
  });
}
