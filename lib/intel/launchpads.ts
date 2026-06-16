import "server-only";

import {
  LAUNCHPADS,
  launchpadById,
  ecosystemById,
  themeById,
  type LaunchpadConfig,
} from "./config";
import { intel, type Intel } from "./result";
import { buildPool, type Article } from "./narratives";
import { listProjects, type IntelProject } from "./projects";
import { listBuilders, type IntelBuilder } from "./builders";

/**
 * Launchpad intelligence — a curated layer over official sources. We never
 * invent launch statistics; the only numbers shown are counts of real, matched
 * news articles. Metrics with no data are simply not rendered.
 */

export interface LaunchpadView extends LaunchpadConfig {
  recentNewsCount: number;
}

export async function listLaunchpads(
  ecosystem?: string,
): Promise<Intel<LaunchpadView[]>> {
  return intel<LaunchpadView[]>({
    empty: [],
    run: async () => {
      const pool = await buildPool().catch(() => [] as Article[]);
      const list = ecosystem
        ? LAUNCHPADS.filter((l) => l.ecosystem === ecosystem)
        : LAUNCHPADS;
      return list.map((l) => ({
        ...l,
        recentNewsCount: pool.filter((a) =>
          l.keywords.some((k) => a.title.toLowerCase().includes(k.toLowerCase())),
        ).length,
      }));
    },
    // Always non-empty (curated list), so this never shows an empty state.
    isEmpty: () => false,
  });
}

export interface LaunchpadDetail {
  launchpad: LaunchpadConfig;
  ecosystemName: string | null;
  narratives: { id: string; name: string }[];
  projects: IntelProject[];
  builders: IntelBuilder[];
  news: Article[];
}

export async function getLaunchpad(id: string): Promise<Intel<LaunchpadDetail | null>> {
  const cfg = launchpadById(id);
  if (!cfg) return { status: "empty", data: null };

  return intel<LaunchpadDetail | null>({
    empty: null,
    isEmpty: (v) => v == null,
    run: async () => {
      const [pool, projectsRes, buildersRes] = await Promise.all([
        buildPool().catch(() => [] as Article[]),
        listProjects({ ecosystem: cfg.ecosystem }),
        listBuilders({ ecosystem: cfg.ecosystem }),
      ]);
      const news = pool
        .filter((a) =>
          cfg.keywords.some((k) => a.title.toLowerCase().includes(k.toLowerCase())),
        )
        .slice(0, 10);
      return {
        launchpad: cfg,
        ecosystemName: ecosystemById(cfg.ecosystem)?.name ?? null,
        narratives: cfg.narrativeIds
          .map((nid) => themeById(nid))
          .filter((t): t is NonNullable<typeof t> => Boolean(t))
          .map((t) => ({ id: t.id, name: t.name })),
        projects: projectsRes.data.slice(0, 6),
        builders: buildersRes.data.slice(0, 6),
        news,
      };
    },
  });
}
