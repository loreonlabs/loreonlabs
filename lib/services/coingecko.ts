import "server-only";

import { serverEnv } from "@/lib/env";
import { httpJson, runService } from "./core";
import type { ServiceResponse } from "./types";

/**
 * CoinGecko — token data, market data, and trending assets.
 *
 * The public API works without a key (rate-limited); COINGECKO_API_KEY raises
 * limits via the demo header. The service is therefore always enabled, with the
 * key applied when present.
 */

const PUBLIC_BASE = "https://api.coingecko.com/api/v3";
const TTL_MARKET = 60 * 1000; // 1 min
const TTL_TOKEN = 2 * 60 * 1000; // 2 min
const TTL_TRENDING = 5 * 60 * 1000; // 5 min

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  marketCap: number;
  change24h: number;
  rank: number;
}

export interface TokenData {
  id: string;
  symbol: string;
  name: string;
  description: string;
  homepage?: string;
  price: number;
  marketCap: number;
  change24h: number;
}

export interface TrendingCoin {
  id: string;
  symbol: string;
  name: string;
  rank: number;
  thumb: string;
}

function headers(): Record<string, string> {
  const { coingeckoApiKey } = serverEnv();
  return coingeckoApiKey ? { "x-cg-demo-api-key": coingeckoApiKey } : {};
}

/* ----------------------------- market ----------------------------- */

interface RawMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  price_change_percentage_24h: number | null;
  market_cap_rank: number | null;
}

export function getMarketData(
  opts: { perPage?: number; ids?: string[] } = {},
): Promise<ServiceResponse<MarketAsset[]>> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: String(opts.perPage ?? 20),
    page: "1",
    price_change_percentage: "24h",
  });
  if (opts.ids?.length) params.set("ids", opts.ids.join(","));

  return runService({
    enabled: true,
    cacheKey: `cg:markets:${params.toString()}`,
    ttlMs: TTL_MARKET,
    fallback: [] as MarketAsset[],
    fetcher: async () => {
      const raw = await httpJson<RawMarket[]>(
        `${PUBLIC_BASE}/coins/markets?${params}`,
        { headers: headers(), revalidate: 60 },
      );
      return raw.map((c) => ({
        id: c.id,
        symbol: c.symbol.toUpperCase(),
        name: c.name,
        image: c.image,
        price: c.current_price ?? 0,
        marketCap: c.market_cap ?? 0,
        change24h: c.price_change_percentage_24h ?? 0,
        rank: c.market_cap_rank ?? 0,
      }));
    },
  });
}

/* ----------------------------- token ------------------------------ */

interface RawCoin {
  id: string;
  symbol: string;
  name: string;
  description?: { en?: string };
  links?: { homepage?: string[] };
  market_data?: {
    current_price?: { usd?: number };
    market_cap?: { usd?: number };
    price_change_percentage_24h?: number;
  };
}

export function getTokenData(id: string): Promise<ServiceResponse<TokenData | null>> {
  return runService<TokenData | null>({
    enabled: true,
    cacheKey: `cg:token:${id}`,
    ttlMs: TTL_TOKEN,
    fallback: null,
    fetcher: async () => {
      const c = await httpJson<RawCoin>(
        `${PUBLIC_BASE}/coins/${encodeURIComponent(id)}?localization=false&tickers=false&community_data=false&developer_data=false`,
        { headers: headers(), revalidate: 120 },
      );
      const homepage = c.links?.homepage?.find(Boolean);
      return {
        id: c.id,
        symbol: c.symbol.toUpperCase(),
        name: c.name,
        description: c.description?.en?.split(". ")[0] ?? "",
        homepage,
        price: c.market_data?.current_price?.usd ?? 0,
        marketCap: c.market_data?.market_cap?.usd ?? 0,
        change24h: c.market_data?.price_change_percentage_24h ?? 0,
      };
    },
    isEmpty: (v) => v == null,
  });
}

/* ---------------------------- trending ---------------------------- */

interface RawTrending {
  coins?: Array<{
    item?: {
      id: string;
      symbol: string;
      name: string;
      market_cap_rank: number | null;
      thumb: string;
    };
  }>;
}

export function getTrending(): Promise<ServiceResponse<TrendingCoin[]>> {
  return runService({
    enabled: true,
    cacheKey: "cg:trending",
    ttlMs: TTL_TRENDING,
    fallback: [] as TrendingCoin[],
    fetcher: async () => {
      const raw = await httpJson<RawTrending>(`${PUBLIC_BASE}/search/trending`, {
        headers: headers(),
        revalidate: 300,
      });
      return (raw.coins ?? [])
        .map((c) => c.item)
        .filter((i): i is NonNullable<typeof i> => Boolean(i))
        .map((i) => ({
          id: i.id,
          symbol: i.symbol.toUpperCase(),
          name: i.name,
          rank: i.market_cap_rank ?? 0,
          thumb: i.thumb,
        }));
    },
  });
}
