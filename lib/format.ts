import type { AttentionTier, ProjectStage, SourceKey } from "./types";

export const tierLabels: Record<AttentionTier, string> = {
  emerging: "Emerging",
  accelerating: "Accelerating",
  mainstream: "Mainstream",
  cooling: "Cooling",
};

export const stageLabels: Record<ProjectStage, string> = {
  stealth: "Stealth",
  emerging: "Emerging",
  building: "Building",
  scaling: "Scaling",
};

export const sourceLabels: Record<SourceKey, string> = {
  web: "Web",
  tavily: "Tavily",
  jina: "Jina AI",
  reddit: "Reddit",
  github: "GitHub",
  coingecko: "CoinGecko",
};

const discoveryTypeLabels: Record<string, string> = {
  narrative: "Narrative",
  founder: "Founder",
  project: "Project",
  signal: "Signal",
  ecosystem: "Ecosystem",
};

export function typeLabel(type: string): string {
  return discoveryTypeLabels[type] ?? type;
}
