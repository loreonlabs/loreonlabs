import "server-only";

import { serverEnv } from "@/lib/env";
import * as rss from "@/lib/api/rss";
import * as hn from "@/lib/api/hackernews";
import * as tavily from "@/lib/api/tavily";
import { NARRATIVE_THEMES, themeById, type NarrativeTheme } from "./config";
import { intel, type Intel } from "./result";

/**
 * Narrative intelligence — real article clusters. Each narrative is a theme
 * (a category, not a fictional entity) populated from live RSS + Hacker News,
 * with an AI summary + cited sources from Tavily on the detail page. Article
 * count, momentum, and dates are all computed from real fetched articles.
 */

export interface Article {
  title: string;
  url: string;
  source: string;
  publishedAt: string; // ISO ("" if unknown)
}

export interface IntelNarrative {
  id: string;
  name: string;
  category: string;
  ecosystems: string[];
  articleCount: number;
  /** Articles within the last 7 days — the momentum signal. */
  recentCount: number;
  latestDate: string;
  sources: Article[];
}

const WEEK = 7 * 24 * 60 * 60 * 1000;

function hnToArticle(i: hn.HNItem): Article {
  return {
    title: i.title,
    url: i.url ?? `https://news.ycombinator.com/item?id=${i.id}`,
    source: "Hacker News",
    publishedAt: i.time ? new Date(i.time * 1000).toISOString() : "",
  };
}

function matches(theme: NarrativeTheme, text: string): boolean {
  const t = text.toLowerCase();
  return theme.keywords.some((k) => t.includes(k.toLowerCase()));
}

function clusterFor(theme: NarrativeTheme, pool: Article[]): IntelNarrative {
  const seen = new Set<string>();
  const sources = pool.filter((a) => {
    if (!matches(theme, `${a.title}`)) return false;
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });
  const now = Date.now();
  const recentCount = sources.filter(
    (a) => a.publishedAt && now - Date.parse(a.publishedAt) < WEEK,
  ).length;
  const latestDate = sources
    .map((a) => a.publishedAt)
    .filter(Boolean)
    .sort()
    .at(-1);
  return {
    id: theme.id,
    name: theme.name,
    category: theme.category,
    ecosystems: theme.ecosystems,
    articleCount: sources.length,
    recentCount,
    latestDate: latestDate ?? "",
    sources: sources.slice(0, 4),
  };
}

export async function buildPool(): Promise<Article[]> {
  const [feed, stories] = await Promise.all([
    rss.getAggregatedFeed(60).catch(() => []),
    hn.getTopStories(60).catch(() => []),
  ]);
  return [
    ...feed.map((f) => ({
      title: f.title,
      url: f.link,
      source: f.source,
      publishedAt: f.publishedAt,
    })),
    ...stories.map(hnToArticle),
  ];
}

export async function listNarratives(): Promise<Intel<IntelNarrative[]>> {
  return intel<IntelNarrative[]>({
    empty: [],
    run: async () => {
      const pool = await buildPool();
      return NARRATIVE_THEMES.map((t) => clusterFor(t, pool)).sort(
        (a, b) => b.recentCount - a.recentCount || b.articleCount - a.articleCount,
      );
    },
  });
}

export interface NarrativeDetail extends IntelNarrative {
  aiSummary: string | null;
  allSources: Article[];
}

export async function getNarrative(id: string): Promise<Intel<NarrativeDetail | null>> {
  const theme = themeById(id);
  if (!theme) return { status: "empty", data: null };

  return intel<NarrativeDetail | null>({
    empty: null,
    isEmpty: (v) => v == null,
    run: async () => {
      const pool = await buildPool();
      const base = clusterFor(theme, pool);

      let aiSummary: string | null = null;
      let tavilySources: Article[] = [];
      if (serverEnv().has.tavily) {
        const search = await tavily.searchNarratives(theme.name).catch(() => null);
        if (search) {
          aiSummary = search.answer ?? null;
          tavilySources = search.results.map((r) => ({
            title: r.title,
            url: r.url,
            source: "Web",
            publishedAt: "",
          }));
        }
      }

      const seen = new Set<string>();
      const allSources = [...base.sources, ...tavilySources, ...articlesFrom(theme, pool)].filter(
        (a) => a.url && !seen.has(a.url) && seen.add(a.url),
      );

      return { ...base, aiSummary, allSources };
    },
  });
}

function articlesFrom(theme: NarrativeTheme, pool: Article[]): Article[] {
  return pool.filter((a) => matches(theme, a.title));
}
