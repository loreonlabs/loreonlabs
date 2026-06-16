import type { SearchResult } from "@/lib/types";

/** Example results shown in the unified search experience (static placeholder). */
export const sampleSearchResults: SearchResult[] = [
  {
    id: "s-ai-agents",
    title: "AI Agents",
    type: "narrative",
    description: "Accelerating narrative across AI, Base, and Ethereum.",
    href: "/app/narratives",
  },
  {
    id: "s-quill",
    title: "Quill (@0xQuill)",
    type: "founder",
    description: "Infrastructure founder with rising signal score.",
    href: "/app/founders",
  },
  {
    id: "s-helix",
    title: "Helix Protocol",
    type: "project",
    description: "Emerging onchain coordination layer on Base.",
    href: "/app/projects",
  },
  {
    id: "s-base",
    title: "Base",
    type: "ecosystem",
    description: "Consumer apps and infrastructure gaining velocity.",
    href: "/app/ecosystems",
  },
  {
    id: "s-prediction",
    title: "Prediction markets attention spike",
    type: "signal",
    description: "Fastest-accelerating early market signal this week.",
    href: "/app/markets",
  },
];

/** Suggested searches surfaced before a query is entered. */
export const searchSuggestions: string[] = [
  "AI agents",
  "Base consumer apps",
  "Stablecoin payments",
  "Emerging founders",
  "Prediction markets",
  "Solana",
];

/** Entity categories the unified search spans. */
export const searchScopes: { label: string; type: SearchResult["type"] }[] = [
  { label: "Narratives", type: "narrative" },
  { label: "Founders", type: "founder" },
  { label: "Projects", type: "project" },
  { label: "Ecosystems", type: "ecosystem" },
  { label: "Signals", type: "signal" },
];
