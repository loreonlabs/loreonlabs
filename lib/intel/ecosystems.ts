import "server-only";

import { ECOSYSTEMS, ecosystemById, NARRATIVE_THEMES } from "./config";
import { intel, type Intel } from "./result";
import { buildPool, type Article } from "./narratives";
import { listProjects, type IntelProject } from "./projects";
import { listBuilders, type IntelBuilder } from "./founders";

/**
 * Ecosystem intelligence — fully dynamic. The list shows real news momentum per
 * ecosystem (from live articles); the detail page aggregates real projects
 * (GitHub), real builders (GitHub), related narrative themes, and recent news.
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

export async function listEcosystems(): Promise<Intel<IntelEcosystem[]>> {
  return intel<IntelEcosystem[]>({
    empty: [],
    run: async () => {
      const pool = await buildPool();
      const now = Date.now();
      return ECOSYSTEMS.map((e) => {
        const news = newsFor(e.keywords, pool);
        return {
          id: e.id,
          name: e.name,
          symbol: e.symbol,
          blurb: e.blurb,
          newsCount: news.length,
          recentNews: news.filter(
            (a) => a.publishedAt && now - Date.parse(a.publishedAt) < WEEK,
          ).length,
        };
      }).sort((a, b) => b.recentNews - a.recentNews);
    },
  });
}

export interface EcosystemDetail {
  ecosystem: IntelEcosystem;
  projects: IntelProject[];
  builders: IntelBuilder[];
  narratives: { id: string; name: string; category: string }[];
  news: Article[];
}

export async function getEcosystem(id: string): Promise<Intel<EcosystemDetail | null>> {
  const cfg = ecosystemById(id);
  if (!cfg) return { status: "empty", data: null };

  return intel<EcosystemDetail | null>({
    empty: null,
    isEmpty: (v) => v == null,
    run: async () => {
      const [pool, projectsRes, buildersRes] = await Promise.all([
        buildPool(),
        listProjects({ ecosystem: id }),
        listBuilders({ ecosystem: id }),
      ]);
      const news = newsFor(cfg.keywords, pool);
      const now = Date.now();
      return {
        ecosystem: {
          id: cfg.id,
          name: cfg.name,
          symbol: cfg.symbol,
          blurb: cfg.blurb,
          newsCount: news.length,
          recentNews: news.filter(
            (a) => a.publishedAt && now - Date.parse(a.publishedAt) < WEEK,
          ).length,
        },
        projects: projectsRes.data.slice(0, 9),
        builders: buildersRes.data.slice(0, 9),
        narratives: NARRATIVE_THEMES.filter((t) => t.ecosystems.includes(id)).map(
          (t) => ({ id: t.id, name: t.name, category: t.category }),
        ),
        news: news.slice(0, 8),
      };
    },
  });
}
