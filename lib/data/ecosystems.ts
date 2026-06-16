import type { Ecosystem } from "@/lib/types";

/** Placeholder ecosystems. Static, realistic content for layout and structure. */
export const ecosystems: Ecosystem[] = [
  {
    id: "base",
    name: "Base",
    symbol: "B",
    description: "Onchain consumer apps and infrastructure gaining velocity.",
    attentionScore: 91,
    activeNarratives: 142,
    trackedProjects: 318,
    trend: "up",
    overview:
      "Base has become a center of gravity for consumer onchain apps. Low-friction onboarding and sustained retention are pulling in builders and users alike, making it one of the highest-attention ecosystems Loreon tracks.",
    highlights: [
      "Leading destination for consumer onchain apps",
      "Strong retention beyond speculation",
      "Steady stream of new launches",
    ],
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "Ξ",
    description: "Core protocol, L2s, and restaking activity.",
    attentionScore: 76,
    activeNarratives: 318,
    trackedProjects: 1240,
    trend: "flat",
    overview:
      "Ethereum remains the deepest ecosystem by builder count and tracked projects. Attention is steady as activity distributes across L2s, restaking, and core protocol work.",
    highlights: [
      "Largest tracked project base",
      "Activity distributing across L2s",
      "Restaking remains structurally important",
    ],
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "S",
    description: "High-throughput apps and consumer momentum.",
    attentionScore: 83,
    activeNarratives: 205,
    trackedProjects: 540,
    trend: "up",
    overview:
      "Solana continues to attract consumer and high-throughput applications. Momentum is rising as new consumer experiences show durable usage.",
    highlights: [
      "Strong consumer application momentum",
      "High-throughput infrastructure advantages",
      "Growing developer channel activity",
    ],
  },
  {
    id: "ai",
    name: "AI",
    symbol: "AI",
    description: "Agents, models, and AI-native infrastructure.",
    attentionScore: 95,
    activeNarratives: 264,
    trackedProjects: 410,
    trend: "up",
    overview:
      "AI is the highest-attention theme Loreon tracks, spanning agents, verifiable inference, and AI-native infrastructure. Developer activity is compounding faster here than anywhere else.",
    highlights: [
      "Highest attention across all tracked themes",
      "Compounding developer activity",
      "Deep overlap with crypto infrastructure",
    ],
  },
  {
    id: "defi",
    name: "DeFi",
    symbol: "D",
    description: "Liquidity, lending, and structured products.",
    attentionScore: 68,
    activeNarratives: 176,
    trackedProjects: 720,
    trend: "down",
    overview:
      "DeFi remains foundational but attention has cooled relative to AI and consumer themes. Innovation is concentrated in liquidity efficiency and structured products.",
    highlights: [
      "Foundational liquidity and lending layer",
      "Innovation in capital efficiency",
      "Attention rotating toward AI and consumer",
    ],
  },
];
