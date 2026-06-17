import "server-only";

import { serverEnv } from "@/lib/env";
import { httpJson, withCache, health, type ApiHealth } from "./client";

/**
 * CoinGecko — token data, market data, trending assets.
 *
 * Works without a key (rate-limited); COINGECKO_API_KEY (a demo key) is applied
 * via the x-cg-demo-api-key header when present. Never hardcodes the key.
 */

const BASE = "https://api.coingecko.com/api/v3";
const TTL_MARKET = 60 * 60 * 1000; // 1h
const TTL_TOKEN = 60 * 60 * 1000; // 1h
const TTL_TRENDING = 60 * 60 * 1000; // 1h

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

export interface TokenLinks {
  website?: string;
  explorer?: string;
  github?: string;
  twitter?: string;
  reddit?: string;
  telegram?: string;
}

export interface TokenData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  description: string;
  categories: string[];
  links: TokenLinks;
  rank: number;
  price: number;
  marketCap: number;
  fdv: number;
  volume: number;
  circulatingSupply: number;
  totalSupply: number;
  change24h: number;
  change7d: number;
  change30d: number;
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
  opts: { perPage?: number; ids?: string[]; category?: string } = {},
): Promise<MarketAsset[]> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: String(opts.perPage ?? 20),
    page: "1",
    price_change_percentage: "24h",
  });
  if (opts.ids?.length) params.set("ids", opts.ids.join(","));
  if (opts.category) params.set("category", opts.category);

  return withCache(`cg:markets:${params}`, TTL_MARKET, async () => {
    const raw = await httpJson<RawMarket[]>(`${BASE}/coins/markets?${params}`, {
      headers: headers(),
    });
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
  });
}

interface RawCoin {
  id: string;
  symbol: string;
  name: string;
  description?: { en?: string };
  categories?: (string | null)[];
  image?: { large?: string; small?: string; thumb?: string };
  links?: {
    homepage?: string[];
    blockchain_site?: string[];
    repos_url?: { github?: string[] };
    twitter_screen_name?: string;
    subreddit_url?: string;
    telegram_channel_identifier?: string;
  };
  market_cap_rank?: number | null;
  market_data?: {
    current_price?: { usd?: number };
    market_cap?: { usd?: number };
    fully_diluted_valuation?: { usd?: number };
    total_volume?: { usd?: number };
    circulating_supply?: number;
    total_supply?: number;
    price_change_percentage_24h?: number;
    price_change_percentage_7d?: number;
    price_change_percentage_30d?: number;
  };
}

function firstNonEmpty(arr?: (string | null | undefined)[]): string | undefined {
  return arr?.map((s) => s?.trim()).find((s) => s) || undefined;
}

export function getTokenData(id: string): Promise<TokenData> {
  return withCache(`cg:token:${id}`, TTL_TOKEN, async () => {
    const c = await httpJson<RawCoin>(
      `${BASE}/coins/${encodeURIComponent(id)}?localization=false&tickers=false&community_data=false&developer_data=false`,
      { headers: headers() },
    );
    const md = c.market_data;
    const twitter = c.links?.twitter_screen_name?.trim();
    const telegram = c.links?.telegram_channel_identifier?.trim();
    return {
      id: c.id,
      symbol: c.symbol.toUpperCase(),
      name: c.name,
      image: c.image?.large ?? c.image?.small ?? c.image?.thumb ?? "",
      description: c.description?.en?.split(". ").slice(0, 2).join(". ") ?? "",
      categories: (c.categories ?? []).filter((x): x is string => Boolean(x)),
      links: {
        website: firstNonEmpty(c.links?.homepage),
        explorer: firstNonEmpty(c.links?.blockchain_site),
        github: firstNonEmpty(c.links?.repos_url?.github),
        twitter: twitter ? `https://x.com/${twitter}` : undefined,
        reddit: c.links?.subreddit_url?.trim() || undefined,
        telegram: telegram ? `https://t.me/${telegram}` : undefined,
      },
      rank: c.market_cap_rank ?? 0,
      price: md?.current_price?.usd ?? 0,
      marketCap: md?.market_cap?.usd ?? 0,
      fdv: md?.fully_diluted_valuation?.usd ?? 0,
      volume: md?.total_volume?.usd ?? 0,
      circulatingSupply: md?.circulating_supply ?? 0,
      totalSupply: md?.total_supply ?? 0,
      change24h: md?.price_change_percentage_24h ?? 0,
      change7d: md?.price_change_percentage_7d ?? 0,
      change30d: md?.price_change_percentage_30d ?? 0,
    };
  });
}

interface RawTrending {
  coins?: Array<{
    item?: { id: string; symbol: string; name: string; market_cap_rank: number | null; thumb: string };
  }>;
}

export function getTrending(): Promise<TrendingCoin[]> {
  return withCache("cg:trending", TTL_TRENDING, async () => {
    const raw = await httpJson<RawTrending>(`${BASE}/search/trending`, {
      headers: headers(),
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
  });
}

export interface CoinHit {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  thumb: string;
}

/** Search coins by name/symbol (for global search). */
export function search(query: string): Promise<CoinHit[]> {
  return withCache(`cg:search:${query}`, TTL_TOKEN, async () => {
    const raw = await httpJson<{
      coins?: Array<{ id: string; name: string; symbol: string; market_cap_rank: number | null; thumb: string }>;
    }>(`${BASE}/search?query=${encodeURIComponent(query)}`, { headers: headers() });
    return (raw.coins ?? []).slice(0, 8).map((c) => ({
      id: c.id,
      name: c.name,
      symbol: c.symbol.toUpperCase(),
      rank: c.market_cap_rank ?? 0,
      thumb: c.thumb,
    }));
  });
}

/** Verify CoinGecko connectivity (and the key, when set). */
export function testCoinGecko(): Promise<ApiHealth> {
  return health(async () => {
    const res = await httpJson<{ gecko_says?: string }>(`${BASE}/ping`, {
      headers: headers(),
    });
    const keyed = serverEnv().has.coingecko ? "keyed" : "public";
    return res.gecko_says ? `pong (${keyed})` : `ok (${keyed})`;
  });
}
