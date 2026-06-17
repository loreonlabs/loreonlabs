import "server-only";

import { unstable_cache } from "next/cache";
import { serverEnv } from "@/lib/env";
import * as rss from "@/lib/api/rss";
import * as hn from "@/lib/api/hackernews";
import * as tavily from "@/lib/api/tavily";
import { NARRATIVE_THEMES, themeById, ecosystemById, type NarrativeTheme } from "./config";
import { intel, type Intel } from "./result";
import { listProjects, type IntelProject } from "./projects";
import { listBuilders, type IntelBuilder } from "./builders";

/**
 * Research / narrative intelligence — real article clusters. Each narrative is
 * a theme populated from live news and developer sources, with an executive
 * summary and cited sources. Article count, momentum, and dates are computed
 * from real, dated articles. Themes without enough real coverage are hidden.
 */

export interface Article {
  title: string;
  url: string;
  source: string;
  publishedAt: string; // ISO ("" if unknown)
  /** Title + summary, used for keyword matching (not displayed). */
  text?: string;
}

export interface IntelNarrative {
  id: string;
  name: string;
  category: string;
  summary: string;
  ecosystems: string[];
  articleCount: number;
  recentCount: number; // last 7 days
  latestDate: string;
  sources: Article[];
}

/** Minimum real articles for a narrative to be shown at all. */
const MIN_ARTICLES = 5;
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

function dedupeByUrl(articles: Article[]): Article[] {
  const seen = new Set<string>();
  return articles.filter((a) => a.url && !seen.has(a.url) && seen.add(a.url));
}

function clusterFor(theme: NarrativeTheme, pool: Article[]): IntelNarrative {
  const sources = dedupeByUrl(pool.filter((a) => matches(theme, a.text ?? a.title)));
  const now = Date.now();
  const recentCount = sources.filter(
    (a) => a.publishedAt && now - Date.parse(a.publishedAt) < WEEK,
  ).length;
  const latestDate = sources.map((a) => a.publishedAt).filter(Boolean).sort().at(-1);
  return {
    id: theme.id,
    name: theme.name,
    category: theme.category,
    summary: theme.summary,
    ecosystems: theme.ecosystems,
    articleCount: sources.length,
    recentCount,
    latestDate: latestDate ?? "",
    sources: sources.slice(0, 4),
  };
}

const _buildPool = unstable_cache(
  async (): Promise<Article[]> => {
    const [feed, top, best] = await Promise.all([
      rss.getAggregatedFeed(250).catch(() => []),
      hn.getTopStories(80).catch(() => []),
      hn.getBestStories(40).catch(() => []),
    ]);
    const seen = new Set<string>();
    return [
      ...feed.map((f) => ({
        title: f.title,
        url: f.link,
        source: f.source,
        publishedAt: f.publishedAt,
        text: `${f.title} ${f.summary}`,
      })),
      ...top.map(hnToArticle),
      ...best.map(hnToArticle),
    ].filter((a) => a.url && !seen.has(a.url) && seen.add(a.url));
  },
  ["article-pool"],
  { revalidate: 21600 },
);

/** Shared, cached article pool (revalidates every 5 min). */
export function buildPool(): Promise<Article[]> {
  return _buildPool();
}

function matchedSources(theme: NarrativeTheme, pool: Article[]): Article[] {
  return dedupeByUrl(pool.filter((a) => matches(theme, a.text ?? a.title)));
}

const _listNarratives = unstable_cache(
  async (): Promise<IntelNarrative[]> => {
      const pool = await buildPool();
      const clusters = NARRATIVE_THEMES.map((t) => clusterFor(t, pool));

      // Augment thin themes with real, cited web articles so well-defined
      // narratives aren't hidden purely for lack of feed coverage.
      if (serverEnv().has.tavily) {
        const thin = clusters.filter((c) => c.articleCount < MIN_ARTICLES);
        const augmented = await Promise.all(
          thin.map(async (c) => {
            const theme = themeById(c.id);
            if (!theme) return c;
            const search = await tavily.searchNarratives(theme.name).catch(() => null);
            if (!search) return c;
            const extra: Article[] = search.results.map((r) => ({
              title: r.title,
              url: r.url,
              source: hostOf(r.url),
              publishedAt: "",
            }));
            const merged = dedupeByUrl([...matchedSources(theme, pool), ...extra]);
            return { ...c, articleCount: merged.length, sources: merged.slice(0, 4) };
          }),
        );
        const byId = new Map(augmented.map((c) => [c.id, c] as const));
        for (let i = 0; i < clusters.length; i++) {
          const a = byId.get(clusters[i].id);
          if (a) clusters[i] = a;
        }
      }

      return clusters
        .filter((n) => n.articleCount >= MIN_ARTICLES) // hide thin narratives
        .sort((a, b) => b.recentCount - a.recentCount || b.articleCount - a.articleCount);
  },
  ["narratives-list"],
  { revalidate: 86400 },
);

export async function listNarratives(): Promise<Intel<IntelNarrative[]>> {
  return intel<IntelNarrative[]>({ empty: [], run: _listNarratives });
}

export interface NarrativeDetail extends IntelNarrative {
  aiSummary: string | null;
  timeline: Article[]; // chronological, newest first
  allSources: Article[];
  relatedNarratives: { id: string; name: string }[];
  relatedEcosystems: { id: string; name: string }[];
  relatedProjects: IntelProject[];
  relatedBuilders: IntelBuilder[];
}

export async function getNarrative(id: string): Promise<Intel<NarrativeDetail | null>> {
  const theme = themeById(id);
  if (!theme) return { status: "empty", data: null };

  return intel<NarrativeDetail | null>({
    empty: null,
    isEmpty: (v) => v == null || v.allSources.length < MIN_ARTICLES,
    run: () => _narrativeDetail(id),
  });
}

const _narrativeDetail = unstable_cache(
  async (id: string): Promise<NarrativeDetail | null> => {
      const theme = themeById(id);
      if (!theme) return null;
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
            source: hostOf(r.url),
            publishedAt: "",
          }));
        }
      }

      const fromPool = dedupeByUrl(pool.filter((a) => matches(theme, a.text ?? a.title)));
      const allSources = dedupeByUrl([...fromPool, ...tavilySources]);
      const timeline = [...allSources]
        .filter((a) => a.publishedAt)
        .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

      const relatedNarratives = NARRATIVE_THEMES.filter(
        (t) => t.id !== theme.id && t.ecosystems.some((e) => theme.ecosystems.includes(e)),
      )
        .slice(0, 4)
        .map((t) => ({ id: t.id, name: t.name }));
      const relatedEcosystems = theme.ecosystems
        .map((e) => ecosystemById(e))
        .filter((e): e is NonNullable<typeof e> => Boolean(e))
        .map((e) => ({ id: e.id, name: e.name }));

      const primaryEco = theme.ecosystems[0];
      const [projectsRes, buildersRes] = await Promise.all([
        primaryEco ? listProjects({ ecosystem: primaryEco }) : Promise.resolve({ data: [] as IntelProject[] }),
        primaryEco ? listBuilders({ ecosystem: primaryEco }) : Promise.resolve({ data: [] as IntelBuilder[] }),
      ]);

      return {
        ...base,
        articleCount: allSources.length,
        aiSummary,
        timeline,
        allSources,
        relatedNarratives,
        relatedEcosystems,
        relatedProjects: projectsRes.data.slice(0, 6),
        relatedBuilders: buildersRes.data.slice(0, 6),
      };
  },
  ["narrative-detail"],
  { revalidate: 86400 },
);

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Source";
  }
}
