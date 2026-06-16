/**
 * Integration registry — the contract for upstream data providers.
 *
 * This phase does NOT connect any APIs. The registry below documents the
 * planned sources, the environment variable each will read its credentials
 * from, and a single `DataProvider` interface that future client modules will
 * implement. Keeping this here lets the UI describe data provenance today and
 * gives the data layer a stable shape to grow into.
 */

import type { SourceKey } from "./types";

export type IntegrationCategory =
  | "search"
  | "extraction"
  | "social"
  | "developer"
  | "market";

export type IntegrationStatus = "planned" | "configured" | "live";

export interface IntegrationConfig {
  key: SourceKey;
  name: string;
  category: IntegrationCategory;
  description: string;
  /** What this source contributes to the attention model. */
  contributes: string;
  status: IntegrationStatus;
  /** Environment variable that will hold the API credential. */
  envVar: string;
  docsUrl: string;
}

export const integrations: IntegrationConfig[] = [
  {
    key: "tavily",
    name: "Tavily",
    category: "search",
    description: "Real-time web search and retrieval tuned for research.",
    contributes: "Narrative discovery and source expansion across the open web.",
    status: "planned",
    envVar: "TAVILY_API_KEY",
    docsUrl: "https://docs.tavily.com",
  },
  {
    key: "jina",
    name: "Jina AI",
    category: "extraction",
    description: "Web reading, content extraction, and embeddings.",
    contributes: "Clean text extraction and semantic similarity for clustering.",
    status: "planned",
    envVar: "JINA_API_KEY",
    docsUrl: "https://jina.ai",
  },
  {
    key: "reddit",
    name: "Reddit",
    category: "social",
    description: "Community discussion and early sentiment.",
    contributes: "Social velocity and grassroots attention signals.",
    status: "planned",
    envVar: "REDDIT_CLIENT_ID",
    docsUrl: "https://www.reddit.com/dev/api",
  },
  {
    key: "github",
    name: "GitHub",
    category: "developer",
    description: "Repositories, contributors, and release activity.",
    contributes: "Developer momentum and shipping cadence for projects.",
    status: "planned",
    envVar: "GITHUB_TOKEN",
    docsUrl: "https://docs.github.com/rest",
  },
  {
    key: "coingecko",
    name: "CoinGecko",
    category: "market",
    description: "Market data, prices, and trading metrics.",
    contributes: "Market attention and liquidity context for narratives.",
    status: "planned",
    envVar: "COINGECKO_API_KEY",
    docsUrl: "https://www.coingecko.com/en/api",
  },
];

export const integrationsByKey: Record<string, IntegrationConfig> =
  Object.fromEntries(integrations.map((i) => [i.key, i]));

/**
 * Contract that every future provider client will implement. Implementations
 * live in `lib/providers/*` once integration begins — none exist yet.
 */
export interface DataProvider<TQuery, TResult> {
  readonly key: SourceKey;
  /** Whether credentials are present and the provider is enabled. */
  isEnabled(): boolean;
  fetch(query: TQuery): Promise<TResult>;
}
