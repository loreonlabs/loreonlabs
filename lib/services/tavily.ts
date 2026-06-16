import "server-only";

import { serverEnv } from "@/lib/env";
import { httpJson, runService } from "./core";
import type { ServiceResponse } from "./types";

/**
 * Tavily — real-time web search for narrative discovery, ecosystem research,
 * and project research. Requires TAVILY_API_KEY; returns an empty, "disabled"
 * response when the key is absent.
 */

const TAVILY_ENDPOINT = "https://api.tavily.com/search";
const TTL = 10 * 60 * 1000; // 10 minutes

export interface TavilyResult {
  title: string;
  url: string;
  content: string;
  score: number;
  publishedDate?: string;
}

export interface TavilySearch {
  query: string;
  answer?: string;
  results: TavilyResult[];
}

interface RawTavilyResponse {
  query?: string;
  answer?: string;
  results?: Array<{
    title?: string;
    url?: string;
    content?: string;
    score?: number;
    published_date?: string;
  }>;
}

const EMPTY: TavilySearch = { query: "", results: [] };

interface SearchOptions {
  maxResults?: number;
  searchDepth?: "basic" | "advanced";
  includeAnswer?: boolean;
  topic?: "general" | "news";
}

async function fetchSearch(
  query: string,
  opts: SearchOptions,
): Promise<TavilySearch> {
  const { tavilyApiKey } = serverEnv();
  const raw = await httpJson<RawTavilyResponse>(TAVILY_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      api_key: tavilyApiKey,
      query,
      search_depth: opts.searchDepth ?? "basic",
      max_results: opts.maxResults ?? 8,
      include_answer: opts.includeAnswer ?? true,
      topic: opts.topic ?? "general",
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
      publishedDate: r.published_date,
    })),
  };
}

function search(
  query: string,
  opts: SearchOptions = {},
): Promise<ServiceResponse<TavilySearch>> {
  const { has } = serverEnv();
  return runService({
    enabled: has.tavily,
    cacheKey: `tavily:${query}:${JSON.stringify(opts)}`,
    ttlMs: TTL,
    fallback: { ...EMPTY, query },
    fetcher: () => fetchSearch(query, opts),
    isEmpty: (v) => v.results.length === 0,
  });
}

/** Discover emerging narratives for a theme. */
export function searchNarratives(theme: string) {
  return search(`emerging narratives and trends about ${theme} in crypto and AI`, {
    topic: "news",
    searchDepth: "advanced",
  });
}

/** Research an ecosystem (e.g. Base, Ethereum, Solana). */
export function researchEcosystem(name: string) {
  return search(`${name} ecosystem developments, projects, and momentum`, {
    searchDepth: "advanced",
  });
}

/** Research a specific project. */
export function researchProject(name: string) {
  return search(`${name} crypto project overview, team, and traction`, {
    maxResults: 6,
  });
}
