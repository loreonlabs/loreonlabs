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
  firecrawl: "Firecrawl",
  hackernews: "Hacker News",
  rss: "RSS",
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

/* ----------------------------- formatters ----------------------------- */

export function formatUsd(value: number): string {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "$0";
  if (value < 1)
    return `$${value.toLocaleString("en-US", { maximumSignificantDigits: 4 })}`;
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

export function formatCompact(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "—";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPct(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

/** Real favicon for an official site (used as a logo when no logo asset exists). */
export function faviconUrl(siteUrl: string, size = 64): string {
  try {
    const host = new URL(siteUrl).hostname;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=${size}`;
  } catch {
    return "";
  }
}

export function timeAgo(iso: string): string {
  if (!iso) return "";
  const ts = Date.parse(iso);
  if (Number.isNaN(ts)) return "";
  const diff = Date.now() - ts;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  return `${months}mo ago`;
}
