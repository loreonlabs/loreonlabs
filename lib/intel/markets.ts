import "server-only";

import * as cg from "@/lib/api/coingecko";
import { intel, type Intel } from "./result";
import { ECOSYSTEMS, NARRATIVE_THEMES } from "./config";
import { buildPool, type Article } from "./narratives";

/**
 * Markets intelligence — fully live. Gainers / losers / volume leaders are
 * derived by sorting real market data; the detail view adds related assets,
 * related ecosystems and narratives, and recent news.
 */

export type { MarketAsset, TokenData } from "@/lib/api/coingecko";

export interface MarketsOverview {
  gainers: cg.MarketAsset[];
  losers: cg.MarketAsset[];
  volumeLeaders: cg.MarketAsset[];
  trending: cg.TrendingCoin[];
  topByMarketCap: cg.MarketAsset[];
}

const EMPTY: MarketsOverview = {
  gainers: [],
  losers: [],
  volumeLeaders: [],
  trending: [],
  topByMarketCap: [],
};

export async function getMarketsOverview(): Promise<Intel<MarketsOverview>> {
  return intel<MarketsOverview>({
    empty: EMPTY,
    isEmpty: (v) => v.topByMarketCap.length === 0,
    run: async () => {
      const [markets, trending] = await Promise.all([
        cg.getMarketData({ perPage: 100 }),
        cg.getTrending().catch(() => []),
      ]);
      const byChange = [...markets].sort((a, b) => b.change24h - a.change24h);
      const byMcap = [...markets].sort((a, b) => b.marketCap - a.marketCap);
      return {
        topByMarketCap: markets.slice(0, 25),
        gainers: byChange.slice(0, 10),
        losers: byChange.slice(-10).reverse(),
        volumeLeaders: byMcap.slice(0, 10),
        trending,
      };
    },
  });
}

export async function getToken(id: string): Promise<Intel<cg.TokenData | null>> {
  return intel<cg.TokenData | null>({
    empty: null,
    isEmpty: (v) => v == null,
    run: () => cg.getTokenData(id),
  });
}

export interface MarketDetail {
  token: cg.TokenData;
  related: cg.MarketAsset[];
  ecosystems: { id: string; name: string }[];
  narratives: { id: string; name: string }[];
  news: Article[];
}

function matchText(token: cg.TokenData): string {
  return `${token.name} ${token.symbol} ${token.categories.join(" ")}`.toLowerCase();
}

export async function getMarketDetail(id: string): Promise<Intel<MarketDetail | null>> {
  return intel<MarketDetail | null>({
    empty: null,
    isEmpty: (v) => v == null,
    run: async () => {
      const token = await cg.getTokenData(id);

      const categorySlug = token.categories[0]
        ?.toLowerCase()
        .replace(/&/g, "")
        .replace(/\s+/g, "-");

      const [related, pool] = await Promise.all([
        (categorySlug
          ? cg.getMarketData({ category: categorySlug, perPage: 8 }).catch(() => [])
          : Promise.resolve([])
        ).then((r) => (r.length > 0 ? r : cg.getMarketData({ perPage: 8 }))),
        buildPool().catch(() => [] as Article[]),
      ]);

      const text = matchText(token);
      const ecosystems = ECOSYSTEMS.filter((e) =>
        e.keywords.some((k) => text.includes(k.toLowerCase())),
      ).map((e) => ({ id: e.id, name: e.name }));
      const narratives = NARRATIVE_THEMES.filter((t) =>
        t.keywords.some((k) => text.includes(k.toLowerCase())),
      ).map((t) => ({ id: t.id, name: t.name }));

      const nameKey = token.name.toLowerCase();
      const symKey = token.symbol.toLowerCase();
      const news = pool
        .filter((a) => {
          const t = a.title.toLowerCase();
          return t.includes(nameKey) || new RegExp(`\\b${symKey}\\b`).test(t);
        })
        .slice(0, 6);

      return {
        token,
        related: related.filter((r) => r.id !== token.id).slice(0, 6),
        ecosystems,
        narratives,
        news,
      };
    },
  });
}
