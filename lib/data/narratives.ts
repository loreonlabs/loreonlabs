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
    thesis:
      "Agent frameworks are crossing from experimentation into real workflows. Developer adoption is compounding as tooling matures around memory, payments, and orchestration — and the surface area for consumer-facing agents is expanding quickly.",
    drivers: [
      "Rapid growth in agent framework repositories and contributors",
      "New payment and identity primitives built specifically for agents",
      "Rising mainstream discussion across builder communities",
    ],
    signalBreakdown: [
      { label: "Social velocity", score: 92 },
      { label: "Developer activity", score: 96 },
      { label: "Market attention", score: 88 },
      { label: "Source diversity", score: 90 },
    ],
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
    thesis:
      "Base is becoming the default home for consumer onchain apps. Retention and repeat usage — not just speculation — are increasingly visible, which is what separates a durable narrative from a passing one.",
    drivers: [
      "Sustained daily active usage across consumer apps",
      "Low-friction onboarding pulling in non-crypto-native users",
      "Steady stream of new consumer launches",
    ],
    signalBreakdown: [
      { label: "Social velocity", score: 78 },
      { label: "Developer activity", score: 80 },
      { label: "Market attention", score: 85 },
      { label: "Source diversity", score: 76 },
    ],
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
    thesis:
      "Stablecoins are quietly becoming payment rails. Real-world settlement use cases — remittances, merchant payments, treasury — are expanding well beyond trading desks.",
    drivers: [
      "Growth in merchant and cross-border settlement volume",
      "Lower fees making micro-settlement viable",
      "Institutional interest in stablecoin treasury operations",
    ],
    signalBreakdown: [
      { label: "Social velocity", score: 70 },
      { label: "Developer activity", score: 72 },
      { label: "Market attention", score: 84 },
      { label: "Source diversity", score: 74 },
    ],
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
    thesis:
      "Prediction markets are being treated as an information primitive, not just a betting venue. Volume and mentions are accelerating faster than any other early-stage theme.",
    drivers: [
      "Fastest-accelerating volume among early themes",
      "Mainstream coverage of event-driven markets",
      "New protocols improving liquidity and resolution",
    ],
    signalBreakdown: [
      { label: "Social velocity", score: 90 },
      { label: "Developer activity", score: 82 },
      { label: "Market attention", score: 89 },
      { label: "Source diversity", score: 84 },
    ],
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
    thesis:
      "Restaking remains structurally important but attention has cooled from its peak as the market digests risk and waits for clearer product-market fit in security marketplaces.",
    drivers: [
      "Maturing but slowing developer activity",
      "Ongoing debate around systemic risk",
      "Attention rotating toward AI and consumer themes",
    ],
    signalBreakdown: [
      { label: "Social velocity", score: 52 },
      { label: "Developer activity", score: 64 },
      { label: "Market attention", score: 56 },
      { label: "Source diversity", score: 58 },
    ],
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
    thesis:
      "The intersection of AI and crypto is moving from narrative to infrastructure: verifiable inference, agent payments, and onchain coordination are attracting serious builders.",
    drivers: [
      "Verifiable inference research moving toward production",
      "Agent payment rails settling onchain",
      "Strong early contributor graphs on new projects",
    ],
    signalBreakdown: [
      { label: "Social velocity", score: 74 },
      { label: "Developer activity", score: 78 },
      { label: "Market attention", score: 66 },
      { label: "Source diversity", score: 72 },
    ],
  },
];
