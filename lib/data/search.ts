import type { SearchResultType } from "@/lib/types";

/** Suggested searches surfaced before a query is entered. */
export const searchSuggestions: string[] = [
  "AI agents",
  "Base consumer apps",
  "Stablecoin payments",
  "Helix Protocol",
  "Prediction markets",
  "Solana",
];

/** Entity categories the unified search spans. */
export const searchScopes: { label: string; type: SearchResultType }[] = [
  { label: "Narratives", type: "narrative" },
  { label: "Projects", type: "project" },
  { label: "Founders", type: "founder" },
  { label: "Ecosystems", type: "ecosystem" },
];
