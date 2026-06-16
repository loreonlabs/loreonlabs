import type { Narrative } from "@/lib/types";

/**
 * Placeholder narratives. Static, realistic content for layout and structure.
 * Replace with live data once the discovery pipeline is connected.
 */
export const narratives: Narrative[] = [
  {
    id: "ai-agents",
    name: "AI Agents",
    category: "AI",
    summary:
      "Autonomous agents moving from demos to production workflows across consumer and infrastructure tooling.",
    attentionScore: 94,
    momentum: "+18%",
    trend: "up",
    tier: "accelerating",
    ecosystems: ["AI", "Base", "Ethereum"],
    sources: ["web", "reddit", "github"],
  },
  {
    id: "base-consumer",
    name: "Base Consumer Apps",
    category: "Base",
    summary:
      "Consumer-facing applications driving sustained onchain activity and retention on Base.",
    attentionScore: 81,
    momentum: "+12%",
    trend: "up",
    tier: "accelerating",
    ecosystems: ["Base"],
    sources: ["web", "coingecko"],
  },
  {
    id: "stablecoin-payments",
    name: "Stablecoin Payments",
    category: "Stablecoins",
    summary:
      "Stablecoins increasingly used for real payments and settlement beyond trading.",
    attentionScore: 76,
    momentum: "+9%",
    trend: "up",
    tier: "mainstream",
    ecosystems: ["Ethereum", "Solana", "Base"],
    sources: ["web", "coingecko"],
  },
  {
    id: "prediction-markets",
    name: "Prediction Markets",
    category: "Prediction Markets",
    summary:
      "Onchain prediction markets gaining attention as a primitive for information and hedging.",
    attentionScore: 88,
    momentum: "+24%",
    trend: "up",
    tier: "emerging",
    ecosystems: ["Ethereum", "Base"],
    sources: ["web", "reddit"],
  },
  {
    id: "restaking",
    name: "Restaking",
    category: "DeFi",
    summary:
      "Restaking primitives and the security marketplaces forming around them.",
    attentionScore: 58,
    momentum: "-3%",
    trend: "down",
    tier: "cooling",
    ecosystems: ["Ethereum"],
    sources: ["web", "github"],
  },
  {
    id: "onchain-ai",
    name: "Onchain AI",
    category: "AI",
    summary:
      "Verifiable inference, agent payments, and AI primitives settling onchain.",
    attentionScore: 72,
    momentum: "+15%",
    trend: "up",
    tier: "emerging",
    ecosystems: ["AI", "Solana", "Base"],
    sources: ["web", "github", "reddit"],
  },
];
