import type { DiscoveryItem, Metric } from "@/lib/types";

/** Headline metrics shown on the Discovery page. */
export const discoveryMetrics: Metric[] = [
  { label: "Signals today", value: "128", delta: "+22", trend: "up" },
  { label: "Emerging", value: "47", delta: "+9", trend: "up" },
  { label: "Accelerating", value: "31", delta: "+4", trend: "up" },
  { label: "Avg lead time", value: "11d", trend: "flat" },
];

/** Placeholder cross-type discovery feed. */
export const discoveryItems: DiscoveryItem[] = [
  {
    id: "d-ai-agents",
    title: "AI Agents moving to production",
    type: "narrative",
    summary:
      "Agent frameworks crossing from experiments into real workflows, with rising developer adoption.",
    attentionScore: 94,
    tier: "accelerating",
    tags: ["AI", "Infrastructure"],
    sources: ["web", "github", "reddit"],
    href: "/narratives/ai-agents",
  },
  {
    id: "d-helix",
    title: "Helix Protocol",
    type: "project",
    summary:
      "Onchain coordination layer for agents surfacing early across builder channels.",
    attentionScore: 88,
    tier: "emerging",
    tags: ["Base", "Infrastructure"],
    sources: ["web", "github"],
    href: "/projects/helix-protocol",
  },
  {
    id: "d-quill",
    title: "Quill (@0xQuill)",
    type: "founder",
    summary:
      "Infrastructure founder with fast SDK adoption and rising community mentions.",
    attentionScore: 96,
    tier: "accelerating",
    tags: ["Founder", "Base"],
    sources: ["reddit", "github"],
    href: "/founders/0xquill",
  },
  {
    id: "d-prediction",
    title: "Prediction markets attention spike",
    type: "signal",
    summary:
      "Volume and mentions accelerating faster than any other early-stage theme.",
    attentionScore: 71,
    tier: "emerging",
    tags: ["Markets", "Ethereum"],
    sources: ["web", "coingecko"],
    href: "/narratives/prediction-markets",
  },
  {
    id: "d-vantage",
    title: "Vantage AI",
    type: "project",
    summary:
      "Stealth verifiable-inference network with a strong early contributor graph.",
    attentionScore: 81,
    tier: "emerging",
    tags: ["AI", "Stealth"],
    sources: ["web", "github"],
    href: "/projects/vantage-ai",
  },
  {
    id: "d-stablecoins",
    title: "Stablecoin payments going mainstream",
    type: "narrative",
    summary:
      "Real-world settlement use cases expanding beyond trading desks.",
    attentionScore: 76,
    tier: "mainstream",
    tags: ["Stablecoins", "Payments"],
    sources: ["web", "coingecko"],
    href: "/narratives/stablecoin-payments",
  },
];
