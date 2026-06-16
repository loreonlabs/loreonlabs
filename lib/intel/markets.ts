import "server-only";

import * as cg from "@/lib/api/coingecko";
import { intel, type Intel } from "./result";

/**
 * Markets intelligence — 100% live CoinGecko. Gainers / losers / volume leaders
 * are derived by sorting real market data; trending from the live endpoint.
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
      const byVolumeProxy = [...markets].sort((a, b) => b.marketCap - a.marketCap);
      return {
        topByMarketCap: markets.slice(0, 25),
        gainers: byChange.slice(0, 10),
        losers: byChange.slice(-10).reverse(),
        volumeLeaders: byVolumeProxy.slice(0, 10),
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
