import type { MarketSignal, Metric } from "@/lib/types";

/** Headline market metrics shown at the top of the Markets page. */
export const marketMetrics: Metric[] = [
  { label: "Attention Index", value: "74.2", delta: "+6.4%", trend: "up", context: "Composite across tracked themes" },
  { label: "Social Velocity", value: "3.1K/d", delta: "+12%", trend: "up", context: "Mentions across communities" },
  { label: "Developer Activity", value: "1.8K/d", delta: "+5%", trend: "up", context: "Commits and releases" },
  { label: "Emerging Signals", value: "47", delta: "+9", trend: "up", context: "New this week" },
];

/** Placeholder market attention signals. */
export const marketSignals: MarketSignal[] = [
  {
    id: "ai-attention",
    label: "AI sector attention",
    value: "95",
    delta: "+11%",
    trend: "up",
    context: "Leading all tracked sectors this week.",
  },
  {
    id: "base-flows",
    label: "Base activity flows",
    value: "88",
    delta: "+7%",
    trend: "up",
    context: "Sustained consumer app usage.",
  },
  {
    id: "stablecoin-volume",
    label: "Stablecoin settlement",
    value: "76",
    delta: "+4%",
    trend: "up",
    context: "Payment-driven volume rising steadily.",
  },
  {
    id: "defi-tvl",
    label: "DeFi attention",
    value: "68",
    delta: "-2%",
    trend: "down",
    context: "Cooling relative to AI and consumer themes.",
  },
  {
    id: "prediction-volume",
    label: "Prediction market volume",
    value: "71",
    delta: "+19%",
    trend: "up",
    context: "Fastest-accelerating early signal.",
  },
];
