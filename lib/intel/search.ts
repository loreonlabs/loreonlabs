import "server-only";

import * as gh from "@/lib/api/github";
import * as cg from "@/lib/api/coingecko";
import { ECOSYSTEMS, NARRATIVE_THEMES } from "./config";
import { toSlug } from "./projects";

/**
 * Unified global search across live sources: GitHub repos (projects), GitHub
 * users (founders), CoinGecko coins (markets), plus the curated narrative and
 * ecosystem themes. Results link to real detail pages.
 */

export type SearchType =
  | "project"
  | "founder"
  | "market"
  | "narrative"
  | "ecosystem";

export interface SearchResult {
  id: string;
  type: SearchType;
  title: string;
  subtitle: string;
  href: string;
  image?: string;
}

export async function globalSearch(query: string): Promise<SearchResult[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const lower = q.toLowerCase();

  // Local (instant) matches — themes & ecosystems.
  const narratives: SearchResult[] = NARRATIVE_THEMES.filter((t) =>
    `${t.name} ${t.category}`.toLowerCase().includes(lower),
  ).map((t) => ({
    id: `narrative-${t.id}`,
    type: "narrative",
    title: t.name,
    subtitle: t.category,
    href: `/narratives/${t.id}`,
  }));

  const ecosystems: SearchResult[] = ECOSYSTEMS.filter((e) =>
    e.name.toLowerCase().includes(lower),
  ).map((e) => ({
    id: `ecosystem-${e.id}`,
    type: "ecosystem",
    title: e.name,
    subtitle: "Ecosystem",
    href: `/ecosystems/${e.id}`,
  }));

  // Live matches — fail soft so one provider can't break search.
  const [repos, users, coins] = await Promise.all([
    gh.searchRepositories(`${q} in:name,description`, 5).catch(() => []),
    gh.searchUsers(`${q} in:login`, 5).catch(() => []),
    cg.search(q).catch(() => []),
  ]);

  const projects: SearchResult[] = repos.map((r) => ({
    id: `project-${r.fullName}`,
    type: "project",
    title: r.fullName,
    subtitle: r.description || `${r.stars.toLocaleString()} stars`,
    href: `/projects/${toSlug(r.fullName)}`,
  }));

  const founders: SearchResult[] = users.map((u) => ({
    id: `founder-${u.login}`,
    type: "founder",
    title: u.login,
    subtitle: "GitHub builder",
    href: `/founders/${u.login}`,
    image: u.avatarUrl,
  }));

  const markets: SearchResult[] = coins.map((c) => ({
    id: `market-${c.id}`,
    type: "market",
    title: `${c.name} (${c.symbol})`,
    subtitle: c.rank ? `Rank #${c.rank}` : "Token",
    href: `/markets/${c.id}`,
    image: c.thumb,
  }));

  return [...markets, ...projects, ...founders, ...narratives, ...ecosystems].slice(
    0,
    24,
  );
}
