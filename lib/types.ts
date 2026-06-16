/**
 * Core domain model for the LoreonLabs intelligence platform.
 *
 * These types describe the shape of data the product surfaces. They are
 * intentionally decoupled from any single provider so that the same models can
 * later be populated from Tavily, Jina AI, Reddit, GitHub, or CoinGecko.
 */

/** Identifier for an upstream data source. See lib/integrations.ts. */
export type SourceKey =
  | "web"
  | "tavily"
  | "jina"
  | "reddit"
  | "github"
  | "coingecko"
  | "hackernews"
  | "rss";

export type Trend = "up" | "down" | "flat";

/**
 * Lifecycle of an attention signal — how far along the path from obscure to
 * mainstream a narrative / project / founder currently is.
 */
export type AttentionTier = "emerging" | "accelerating" | "mainstream" | "cooling";

export type ProjectStage = "stealth" | "emerging" | "building" | "scaling";

/** A single labelled metric, used by StatCard and headline rows. */
export interface Metric {
  label: string;
  value: string;
  delta?: string;
  trend?: Trend;
  context?: string;
}

/** A single weighted input to an attention score. */
export interface SignalBreakdown {
  label: string;
  score: number;
}

export interface Narrative {
  id: string;
  name: string;
  category: string;
  summary: string;
  /** Composite attention score, 0–100. See /docs/attention-score. */
  attentionScore: number;
  /** Short-window momentum, e.g. "+18%". */
  momentum: string;
  trend: Trend;
  tier: AttentionTier;
  ecosystems: string[];
  sources: SourceKey[];
  /** Longer-form context shown on the detail page. */
  thesis: string;
  /** What is driving attention right now. */
  drivers: string[];
  /** Per-input score breakdown that rolls up into attentionScore. */
  signalBreakdown: SignalBreakdown[];
}

export interface Founder {
  id: string;
  handle: string;
  name: string;
  focus: string;
  signalScore: number;
  momentum: string;
  trend: Trend;
  highlights: string[];
  ecosystems: string[];
  /** Short profile shown on the detail page. */
  bio: string;
  /** Per-input score breakdown that rolls up into signalScore. */
  signalBreakdown: SignalBreakdown[];
  /** Project ids this founder is associated with. */
  projectIds: string[];
}

export interface Project {
  id: string;
  name: string;
  category: string;
  ecosystem: string;
  stage: ProjectStage;
  summary: string;
  attentionScore: number;
  momentum: string;
  trend: Trend;
  /** Longer description shown on the detail page. */
  about: string;
  /** Notable signals about the project. */
  highlights: string[];
  /** Narrative ids this project relates to. */
  narrativeIds: string[];
  sources: SourceKey[];
}

export interface Ecosystem {
  id: string;
  name: string;
  symbol: string;
  description: string;
  attentionScore: number;
  activeNarratives: number;
  trackedProjects: number;
  trend: Trend;
  /** Longer overview shown on the detail page. */
  overview: string;
  /** Notable highlights for the ecosystem. */
  highlights: string[];
}

export interface MarketSignal {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: Trend;
  context: string;
}

export type DiscoveryType = "narrative" | "founder" | "project" | "signal";

export interface DiscoveryItem {
  id: string;
  title: string;
  type: DiscoveryType;
  summary: string;
  attentionScore: number;
  tier: AttentionTier;
  tags: string[];
  sources: SourceKey[];
  /** Destination for the card — an entity detail page or a section. */
  href: string;
}

export type SearchResultType = DiscoveryType | "ecosystem";

export interface SearchResult {
  id: string;
  title: string;
  type: SearchResultType;
  description: string;
  href: string;
}
