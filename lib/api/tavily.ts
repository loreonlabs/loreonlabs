import "server-only";

import { serverEnv, requireKey } from "@/lib/env";
import { httpJson, withCache, health, type ApiHealth } from "./client";

/**
 * Tavily — narrative discovery, ecosystem research, project research.
 * Reads TAVILY_API_KEY from the server env. Never hardcodes the key.
 */

const ENDPOINT = "https://api.tavily.com/search";
const TTL = 10 * 60 * 1000;

export interface TavilyResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

export interface TavilySearch {
  query: string;
  answer?: string;
  results: TavilyResult[];
}

interface RawTavily {
  query?: string;
  answer?: string;
  results?: Array<{ title?: string; url?: string; content?: string; score?: number }>;
}

interface SearchOptions {
  maxResults?: number;
  searchDepth?: "basic" | "advanced";
  topic?: "general" | "news";
  includeAnswer?: boolean;
}

async function rawSearch(query: string, opts: SearchOptions): Promise<TavilySearch> {
  const key = requireKey("TAVILY_API_KEY", serverEnv().tavilyApiKey);
  const raw = await httpJson<RawTavily>(ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      api_key: key, // supported by both classic and current Tavily auth
      query,
      search_depth: opts.searchDepth ?? "basic",
      topic: opts.topic ?? "general",
      max_results: opts.maxResults ?? 8,
      include_answer: opts.includeAnswer ?? true,
    }),
    timeoutMs: 15_000,
  });
  return {
    query: raw.query ?? query,
    answer: raw.answer,
    results: (raw.results ?? []).map((r) => ({
      title: r.title ?? "Untitled",
      url: r.url ?? "",
      content: r.content ?? "",
      score: r.score ?? 0,
    })),
  };
}

function cachedSearch(query: string, opts: SearchOptions): Promise<TavilySearch> {
  return withCache(`tavily:${query}:${JSON.stringify(opts)}`, TTL, () =>
    rawSearch(query, opts),
  );
}

/** Discover emerging narratives for a theme. */
export function searchNarratives(theme: string): Promise<TavilySearch> {
  return cachedSearch(
    `emerging narratives and trends about ${theme} in crypto and AI`,
    { topic: "news", searchDepth: "advanced" },
  );
}

/** Research an ecosystem (Base, Ethereum, Solana, …). */
export function researchEcosystem(name: string): Promise<TavilySearch> {
  return cachedSearch(`${name} ecosystem developments, projects, and momentum`, {
    searchDepth: "advanced",
  });
}

/** Research a specific project. */
export function researchProject(name: string): Promise<TavilySearch> {
  return cachedSearch(`${name} crypto project overview, team, and traction`, {
    maxResults: 6,
  });
}

/** Verify the Tavily key works. */
export function testTavily(): Promise<ApiHealth> {
  return health(async () => {
    const r = await rawSearch("LoreonLabs connectivity check", { maxResults: 1 });
    return `${r.results.length} result(s)`;
  });
}
