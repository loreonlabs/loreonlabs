import "server-only";

import { unstable_cache } from "next/cache";
import { intel, type Intel } from "./result";
import { getMarketsOverview } from "./markets";
import { listNarratives, buildPool, type Article, type IntelNarrative } from "./narratives";
import { listProjects, type IntelProject } from "./projects";
import type { MarketAsset, TrendingCoin } from "@/lib/api/coingecko";

/**
 * Discovery / Overview aggregate — a real-time cross-section of every live
 * source: trending tokens, top gainers, accelerating narratives, fast-moving
 * projects, and the latest articles.
 */

export interface DiscoveryData {
  trending: TrendingCoin[];
  gainers: MarketAsset[];
  narratives: IntelNarrative[];
  projects: IntelProject[];
  articles: Article[];
}

const EMPTY: DiscoveryData = {
  trending: [],
  gainers: [],
  narratives: [],
  projects: [],
  articles: [],
};

const _getDiscovery = unstable_cache(
  async (): Promise<DiscoveryData> => {
    const [markets, narratives, projects, pool] = await Promise.all([
      getMarketsOverview(),
      listNarratives(),
      listProjects({ sort: "activity" }),
      buildPool(),
    ]);
    const articles = pool
      .filter((a) => a.publishedAt)
      .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
      .slice(0, 10);
    return {
      trending: markets.data.trending.slice(0, 7),
      gainers: markets.data.gainers.slice(0, 6),
      narratives: narratives.data.slice(0, 6),
      projects: projects.data.slice(0, 6),
      articles,
    };
  },
  ["discovery"],
  { revalidate: 120 },
);

export async function getDiscovery(): Promise<Intel<DiscoveryData>> {
  return intel<DiscoveryData>({
    empty: EMPTY,
    isEmpty: (v) =>
      v.trending.length === 0 && v.narratives.length === 0 && v.projects.length === 0,
    run: _getDiscovery,
  });
}
