/**
 * Curated configuration — REAL ecosystems and narrative themes (categories,
 * not fictional entities). Each maps to real queries against the live APIs:
 * GitHub topics/seed repos, CoinGecko categories, and search keywords.
 *
 * No metrics or scores live here — only the labels and the queries used to
 * fetch real data. All numbers shown in the product are computed from the
 * fetched results.
 */

export interface EcosystemConfig {
  id: string;
  name: string;
  symbol: string;
  blurb: string;
  /** GitHub topic used to find real projects. */
  githubTopic: string;
  /** Real seed repos ("owner/repo") used to surface real builders. */
  seedRepos: string[];
  /** Keywords used to filter real news/articles. */
  keywords: string[];
}

export const ECOSYSTEMS: EcosystemConfig[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "Ξ",
    blurb: "Core protocol, L2s, and the largest builder base.",
    githubTopic: "ethereum",
    seedRepos: ["ethereum/go-ethereum", "foundry-rs/foundry"],
    keywords: ["ethereum", "l2", "evm", "rollup"],
  },
  {
    id: "base",
    name: "Base",
    symbol: "B",
    blurb: "Onchain consumer apps and infrastructure on the OP stack.",
    githubTopic: "base",
    seedRepos: ["ethereum-optimism/optimism", "base-org/web"],
    keywords: ["base", "coinbase", "onchain"],
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "S",
    blurb: "High-throughput apps and consumer momentum.",
    githubTopic: "solana",
    seedRepos: ["solana-labs/solana", "coral-xyz/anchor"],
    keywords: ["solana", "spl"],
  },
  {
    id: "ai",
    name: "AI",
    symbol: "AI",
    blurb: "Agents, models, and AI-native infrastructure.",
    githubTopic: "ai-agents",
    seedRepos: ["langchain-ai/langchain", "run-llama/llama_index"],
    keywords: ["ai agents", "llm", "artificial intelligence", "openai"],
  },
  {
    id: "defi",
    name: "DeFi",
    symbol: "D",
    blurb: "Liquidity, lending, and structured products.",
    githubTopic: "defi",
    seedRepos: ["Uniswap/v4-core", "aave/aave-v3-core"],
    keywords: ["defi", "liquidity", "lending", "stablecoin"],
  },
];

export const ecosystemById = (id: string): EcosystemConfig | undefined =>
  ECOSYSTEMS.find((e) => e.id === id);

export interface NarrativeTheme {
  id: string;
  name: string;
  category: string;
  /** Tavily query used to pull real, cited articles. */
  query: string;
  /** Keywords used to filter HN + RSS items. */
  keywords: string[];
  ecosystems: string[];
}

export const NARRATIVE_THEMES: NarrativeTheme[] = [
  {
    id: "ai-agents",
    name: "AI Agents",
    category: "AI",
    query: "autonomous AI agents crypto and software adoption",
    keywords: ["ai agent", "agents", "autonomous", "llm"],
    ecosystems: ["ai", "ethereum", "base"],
  },
  {
    id: "stablecoins",
    name: "Stablecoins & Payments",
    category: "Payments",
    query: "stablecoin payments and settlement adoption",
    keywords: ["stablecoin", "usdc", "usdt", "payments"],
    ecosystems: ["ethereum", "solana", "base"],
  },
  {
    id: "prediction-markets",
    name: "Prediction Markets",
    category: "Markets",
    query: "onchain prediction markets growth",
    keywords: ["prediction market", "polymarket", "betting"],
    ecosystems: ["ethereum", "base"],
  },
  {
    id: "restaking",
    name: "Restaking",
    category: "DeFi",
    query: "restaking and shared security protocols",
    keywords: ["restaking", "eigenlayer", "avs"],
    ecosystems: ["ethereum"],
  },
  {
    id: "l2-scaling",
    name: "L2 Scaling",
    category: "Infrastructure",
    query: "ethereum layer 2 scaling rollups",
    keywords: ["layer 2", "rollup", "l2", "optimism", "arbitrum"],
    ecosystems: ["ethereum", "base"],
  },
  {
    id: "depin",
    name: "DePIN",
    category: "Infrastructure",
    query: "decentralized physical infrastructure networks DePIN",
    keywords: ["depin", "physical infrastructure"],
    ecosystems: ["solana", "ethereum"],
  },
];

export const themeById = (id: string): NarrativeTheme | undefined =>
  NARRATIVE_THEMES.find((t) => t.id === id);
