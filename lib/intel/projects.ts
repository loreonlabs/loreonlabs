import "server-only";

import { unstable_cache } from "next/cache";
import * as gh from "@/lib/api/github";
import { ECOSYSTEMS, ecosystemById } from "./config";
import { intel, type Intel } from "./result";

/**
 * Projects intelligence — real GitHub repositories. Stars, activity, language,
 * topics, and the project website (repo homepage) are all live. "Stage" is
 * derived transparently from real star counts (see /docs/ranking-system).
 */

export type ProjectStage = "emerging" | "building" | "scaling";

export interface IntelProject {
  slug: string; // owner~~repo
  name: string;
  owner: string;
  fullName: string;
  ecosystem: string;
  category: string;
  stage: ProjectStage;
  description: string;
  stars: number;
  forks: number;
  pushedAt: string;
  website: string | null;
  github: string;
  topics: string[];
}

export type ProjectSort = "stars" | "activity" | "name";

const SEP = "~~";
export const toSlug = (fullName: string) => fullName.replace("/", SEP);
export const fromSlug = (slug: string) => slug.replace(SEP, "/");

function stageFromStars(stars: number): ProjectStage {
  if (stars >= 10_000) return "scaling";
  if (stars >= 1_000) return "building";
  return "emerging";
}

function mapProject(r: gh.Repository, ecosystem: string): IntelProject {
  const [owner, name] = r.fullName.split("/");
  return {
    slug: toSlug(r.fullName),
    name,
    owner,
    fullName: r.fullName,
    ecosystem,
    category: r.language ?? "Other",
    stage: stageFromStars(r.stars),
    description: r.description,
    stars: r.stars,
    forks: r.forks,
    pushedAt: r.pushedAt,
    website: r.homepage,
    github: r.url,
    topics: r.topics,
  };
}

export interface ProjectFilters {
  ecosystem?: string;
  stage?: ProjectStage;
  sort?: ProjectSort;
}

const _listProjects = unstable_cache(
  async (filters: ProjectFilters): Promise<IntelProject[]> => {
      const ecosystems = filters.ecosystem
        ? ECOSYSTEMS.filter((e) => e.id === filters.ecosystem)
        : ECOSYSTEMS;
      const groups = await Promise.all(
        ecosystems.map((e) =>
          gh
            .searchRepositories(`topic:${e.githubTopic} stars:>300`, 12)
            .then((repos) => repos.map((r) => mapProject(r, e.id)))
            .catch(() => [] as IntelProject[]),
        ),
      );

      const seen = new Set<string>();
      let all: IntelProject[] = [];
      for (const p of groups.flat()) {
        if (seen.has(p.fullName)) continue;
        seen.add(p.fullName);
        all.push(p);
      }

      if (filters.stage) all = all.filter((p) => p.stage === filters.stage);

      const sort = filters.sort ?? "stars";
      all.sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "activity")
          return Date.parse(b.pushedAt) - Date.parse(a.pushedAt);
        return b.stars - a.stars;
      });
      return all;
  },
  ["projects-list"],
  { revalidate: 300 },
);

export async function listProjects(
  filters: ProjectFilters = {},
): Promise<Intel<IntelProject[]>> {
  return intel<IntelProject[]>({ empty: [], run: () => _listProjects(filters) });
}

export interface ProjectDetail {
  project: IntelProject;
  commits: gh.Commit[];
  contributors: gh.Contributor[];
  ecosystemName: string | null;
}

const _getProject = unstable_cache(
  async (slug: string): Promise<ProjectDetail | null> => {
    const [owner, repo] = fromSlug(slug).split("/");
    if (!owner || !repo) return null;
    const repository = await gh.getRepository(owner, repo);
    if (!repository) return null;
    const [commits, contributors] = await Promise.all([
      gh.getCommits(owner, repo, 8).catch(() => []),
      gh.getContributors(owner, repo, 8).catch(() => []),
    ]);
    const ecosystem =
      ECOSYSTEMS.find((e) => repository.topics.includes(e.githubTopic))?.id ?? "";
    return {
      project: mapProject(repository, ecosystem),
      commits,
      contributors,
      ecosystemName: ecosystem ? ecosystemById(ecosystem)?.name ?? null : null,
    };
  },
  ["project-detail"],
  { revalidate: 300 },
);

export async function getProject(slug: string): Promise<Intel<ProjectDetail | null>> {
  const [owner, repo] = fromSlug(slug).split("/");
  if (!owner || !repo) return { status: "empty", data: null };
  return intel<ProjectDetail | null>({
    empty: null,
    isEmpty: (v) => v == null,
    run: () => _getProject(slug),
  });
}
