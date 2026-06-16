import "server-only";

import * as gh from "@/lib/api/github";
import { ECOSYSTEMS } from "./config";
import { intel, type Intel } from "./result";

/**
 * Builder/founder intelligence — REAL people from GitHub. We surface the most
 * active contributors of each ecosystem's seed repositories, then hydrate full
 * profiles (bio, website, X, repos) on the detail page. No fictional people.
 */

export interface IntelBuilder {
  login: string;
  avatarUrl: string;
  github: string;
  contributions: number;
  ecosystems: string[];
}

export type BuilderSort = "contributions" | "name";

export async function listBuilders(
  opts: { ecosystem?: string; sort?: BuilderSort } = {},
): Promise<Intel<IntelBuilder[]>> {
  const ecosystems = opts.ecosystem
    ? ECOSYSTEMS.filter((e) => e.id === opts.ecosystem)
    : ECOSYSTEMS;

  return intel<IntelBuilder[]>({
    empty: [],
    run: async () => {
      const tasks = ecosystems.flatMap((e) =>
        e.seedRepos.map(async (full) => {
          const [owner, repo] = full.split("/");
          const contributors = await gh
            .getContributors(owner, repo, 12)
            .catch(() => []);
          return contributors.map((c) => ({ c, ecosystem: e.id }));
        }),
      );
      const results = (await Promise.all(tasks)).flat();

      const byLogin = new Map<string, IntelBuilder>();
      for (const { c, ecosystem } of results) {
        const existing = byLogin.get(c.login);
        if (existing) {
          existing.contributions += c.contributions;
          if (!existing.ecosystems.includes(ecosystem))
            existing.ecosystems.push(ecosystem);
        } else {
          byLogin.set(c.login, {
            login: c.login,
            avatarUrl: c.avatarUrl,
            github: c.url,
            contributions: c.contributions,
            ecosystems: [ecosystem],
          });
        }
      }

      const builders = [...byLogin.values()].filter(
        (b) => !b.login.includes("[bot]"),
      );
      const sort = opts.sort ?? "contributions";
      builders.sort((a, b) =>
        sort === "name"
          ? a.login.localeCompare(b.login)
          : b.contributions - a.contributions,
      );
      return builders.slice(0, 36);
    },
  });
}

export interface BuilderDetail {
  profile: gh.Developer;
  repos: gh.Repository[];
  ecosystemNames: string[];
}

export async function getBuilder(login: string): Promise<Intel<BuilderDetail | null>> {
  return intel<BuilderDetail | null>({
    empty: null,
    isEmpty: (v) => v == null,
    run: async () => {
      const profile = await gh.getUser(login);
      const repos = await gh.listUserRepos(login, 6).catch(() => []);
      const ecosystemNames = ECOSYSTEMS.filter((e) =>
        repos.some((r) => r.topics.includes(e.githubTopic)),
      )
        .map((e) => e.name)
        .slice(0, 4);
      return { profile, repos, ecosystemNames };
    },
  });
}
