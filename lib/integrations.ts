/**
 * Integration registry — describes the live data providers backing the service
 * layer in lib/services/*. Used by the docs to document provenance and by the
 * UI to reason about which sources are configured.
 *
 * Credentials are read from the server environment (see lib/env.ts). Sources
 * marked `requiresKey: false` work without credentials (rate-limited).
 */

import type { SourceKey } from "./types";

export type IntegrationCategory =
  | "search"
  | "extraction"
  | "social"
  | "developer"
  | "market"
  | "news";

export interface IntegrationConfig {
  key: SourceKey;
  name: string;
  category: IntegrationCategory;
  description: string;
  /** What this source contributes to the attention model. */
  contributes: string;
  /** Whether an API key/token is required to use the source. */
  requiresKey: boolean;
  /** Environment variable that holds the credential (if any). */
  envVar?: string;
  /** The service module that implements this integration. */
  service: string;
  docsUrl: string;
}

export const integrations: IntegrationConfig[] = [
  {
    key: "tavily",
    name: "Tavily",
    category: "search",
    description: "Real-time web search and retrieval tuned for research.",
    contributes: "Narrative discovery, ecosystem and project research.",
    requiresKey: true,
    envVar: "TAVILY_API_KEY",
    service: "lib/services/tavily.ts",
    docsUrl: "https://docs.tavily.com",
  },
  {
    key: "coingecko",
    name: "CoinGecko",
    category: "market",
    description: "Token data, market data, and trending assets.",
    contributes: "Market attention and liquidity context for narratives.",
    requiresKey: false,
    envVar: "COINGECKO_API_KEY",
    service: "lib/services/coingecko.ts",
    docsUrl: "https://www.coingecko.com/en/api",
  },
  {
    key: "github",
    name: "GitHub",
    category: "developer",
    description: "Repositories, contributors, commits, and developer activity.",
    contributes: "Developer momentum and shipping cadence for founders & projects.",
    requiresKey: false,
    envVar: "GITHUB_TOKEN",
    service: "lib/services/github.ts",
    docsUrl: "https://docs.github.com/rest",
  },
  {
    key: "jina",
    name: "Jina AI",
    category: "extraction",
    description: "Content extraction, webpage parsing, and article ingestion.",
    contributes: "Clean text extraction for downstream analysis.",
    requiresKey: true,
    envVar: "JINA_API_KEY",
    service: "lib/services/jina.ts",
    docsUrl: "https://jina.ai/reader",
  },
  {
    key: "hackernews",
    name: "Hacker News",
    category: "news",
    description: "Top, best, and new stories plus item details.",
    contributes: "Early technology and developer attention signals.",
    requiresKey: false,
    service: "lib/services/hackernews.ts",
    docsUrl: "https://github.com/HackerNews/API",
  },
  {
    key: "rss",
    name: "RSS Aggregator",
    category: "news",
    description: "CoinDesk, Decrypt, Cointelegraph, and CryptoSlate feeds.",
    contributes: "Mainstream coverage and emerging-story velocity.",
    requiresKey: false,
    envVar: "RSS_FEEDS",
    service: "lib/services/rss.ts",
    docsUrl: "https://en.wikipedia.org/wiki/RSS",
  },
];

export const integrationsByKey: Record<string, IntegrationConfig> =
  Object.fromEntries(integrations.map((i) => [i.key, i]));
