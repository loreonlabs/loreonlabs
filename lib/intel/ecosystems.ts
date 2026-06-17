import "server-only";

import { unstable_cache } from "next/cache";
import {
  ECOSYSTEMS,
  ecosystemById,
  themeById,
  launchpadsForEcosystem,
  type LaunchpadConfig,
} from "./config";
import { intel, type Intel } from "./result";
import { buildPool, type Article } from "./narratives";
import { listProjects, type IntelProject } from "./projects";
import { listBuilders, type IntelBuilder } from "./builders";

/**
 * Ecosystem intelligence — fully dynamic and interconnected. The list shows
 * real news momentum; detail pages aggregate launchpads, real projects, real
 * builders, narrative themes, and recent news for that ecosystem.
 */

const WEEK = 7 * 24 * 60 * 60 * 1000;

export interface IntelEcosystem {
  id: string;
  name: string;
  symbol: string;
  blurb: string;
  newsCount: number;
  recentNews: number;
}

function newsFor(keywords: string[], pool: Article[]): Article[] {
  const seen = new Set<string>();
  return pool.filter((a) => {
    const t = a.title.toLowerCase();
    if (!keywords.some((k) => t.includes(k.toLowerCase()))) return false;
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });
}

const _listEcosystems = unstable_cache(
  async (): Promise<IntelEcosystem[]> => {
    const pool = await buildPool().catch(() => [] as Article[]);
    const now = Date.now();
    return ECOSYSTEMS.map((e) => {
      const news = newsFor(e.keywords, pool);
      return {
        id: e.id,
        name: e.name,
        symbol: e.symbol,
        blurb: e.blurb,
        newsCount: news.length,
        recentNews: news.filter((a) => a.publishedAt && now - Date.parse(a.publishedAt) < WEEK).length,
      };
    }).sort((a, b) => b.recentNews - a.recentNews);
  },
  ["ecosystems-list"],
  { revalidate: 86400 },
);

export async function listEcosystems(): Promise<Intel<IntelEcosystem[]>> {
  return intel<IntelEcosystem[]>({ empty: [], isEmpty: () => false, run: _listEcosystems });
}

export interface EcosystemDetail {
  id: string;
  name: string;
  symbol: string;
  overview: string;
  recentNews: number;
  launchpads: LaunchpadConfig[];
  projects: IntelProject[];
  builders: IntelBuilder[];
  narratives: { id: string; name: string; summary: string }[];
  news: Article[];
}

const _getEcosystem = unstable_cache(
  async (id: string): Promise<EcosystemDetail | null> => {
      const cfg = ecosystemById(id);
      if (!cfg) return null;
      const [pool, projectsRes, buildersRes] = await Promise.all([
        buildPool().catch(() => [] as Article[]),
        listProjects({ ecosystem: id }),
        listBuilders({ ecosystem: id }),
      ]);
      const news = newsFor(cfg.keywords, pool);
      const now = Date.now();
      return {
        id: cfg.id,
        name: cfg.name,
        symbol: cfg.symbol,
        overview: cfg.overview,
        recentNews: news.filter((a) => a.publishedAt && now - Date.parse(a.publishedAt) < WEEK).length,
        launchpads: launchpadsForEcosystem(id),
        projects: projectsRes.data.slice(0, 9),
        builders: buildersRes.data.slice(0, 9),
        narratives: cfg.narrativeIds
          .map((nid) => themeById(nid))
          .filter((t): t is NonNullable<typeof t> => Boolean(t))
          .map((t) => ({ id: t.id, name: t.name, summary: t.summary })),
        news: news.slice(0, 8),
      };
  },
  ["ecosystem-detail"],
  { revalidate: 86400 },
);

export async function getEcosystem(id: string): Promise<Intel<EcosystemDetail | null>> {
  if (!ecosystemById(id)) return { status: "empty", data: null };
  return intel<EcosystemDetail | null>({
    empty: null,
    isEmpty: (v) => v == null,
    run: () => _getEcosystem(id),
  });
}
