import "server-only";

import { serverEnv } from "@/lib/env";
import { httpText, withCache, health, type ApiHealth } from "./client";

/**
 * RSS aggregator — parses the comma-separated RSS_FEEDS env (CoinDesk, Decrypt,
 * Cointelegraph, CryptoSlate by default), then fetches and normalizes articles.
 * Dependency-free parsing; resilient per-feed.
 */

const TTL = 6 * 60 * 60 * 1000; // 6h feed cache

export interface RssItem {
  title: string;
  link: string;
  source: string;
  summary: string;
  publishedAt: string; // ISO ("" when unknown)
}

const SOURCE_NAMES: Record<string, string> = {
  "coindesk.com": "CoinDesk",
  "decrypt.co": "Decrypt",
  "cointelegraph.com": "Cointelegraph",
  "cryptoslate.com": "CryptoSlate",
};

function feeds(): string[] {
  return serverEnv().rssFeeds;
}

function sourceName(feedUrl: string): string {
  try {
    const host = new URL(feedUrl).hostname.replace(/^www\./, "");
    const key = Object.keys(SOURCE_NAMES).find((d) => host.endsWith(d));
    return key ? SOURCE_NAMES[key] : host;
  } catch {
    return "RSS";
  }
}

function decode(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"));
  return m ? decode(m[1]) : "";
}

function parseFeed(xml: string, feedUrl: string): RssItem[] {
  const source = sourceName(feedUrl);
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  return blocks.map((block) => {
    const pub = tag(block, "pubDate") || tag(block, "published") || tag(block, "dc:date");
    const date = pub ? new Date(pub) : null;
    return {
      title: tag(block, "title"),
      link: tag(block, "link"),
      source,
      summary: tag(block, "description").slice(0, 280),
      publishedAt: date && !Number.isNaN(date.getTime()) ? date.toISOString() : "",
    };
  });
}

async function fetchFeed(feedUrl: string): Promise<RssItem[]> {
  const xml = await httpText(feedUrl, {
    headers: { accept: "application/rss+xml, application/xml, text/xml" },
  });
  return parseFeed(xml, feedUrl);
}

/** Fetch and normalize a single feed. */
export function getFeed(feedUrl: string): Promise<RssItem[]> {
  return withCache(`rss:${feedUrl}`, TTL, () => fetchFeed(feedUrl));
}

/** Aggregate all configured feeds, newest first, deduped by link. */
export function getAggregatedFeed(limit = 30): Promise<RssItem[]> {
  return withCache(`rss:all:${limit}`, TTL, async () => {
    const results = await Promise.all(
      feeds().map((feed) => fetchFeed(feed).catch(() => [] as RssItem[])),
    );
    const seen = new Set<string>();
    const merged: RssItem[] = [];
    for (const item of results.flat()) {
      if (!item.link || seen.has(item.link)) continue;
      seen.add(item.link);
      merged.push(item);
    }
    merged.sort(
      (a, b) =>
        (b.publishedAt ? Date.parse(b.publishedAt) : 0) -
        (a.publishedAt ? Date.parse(a.publishedAt) : 0),
    );
    return merged.slice(0, limit);
  });
}

/** Configured feed sources. */
export function listSources(): { url: string; name: string }[] {
  return feeds().map((url) => ({ url, name: sourceName(url) }));
}

/** Verify at least one configured RSS feed parses. */
export function testRss(): Promise<ApiHealth> {
  return health(async () => {
    const list = feeds();
    if (list.length === 0) throw new Error("RSS_FEEDS is empty");
    const results = await Promise.allSettled(list.map((f) => fetchFeed(f)));
    const okFeeds = results.filter(
      (r) => r.status === "fulfilled" && r.value.length > 0,
    ).length;
    if (okFeeds === 0) throw new Error("no feeds returned items");
    const items = results.reduce(
      (n, r) => n + (r.status === "fulfilled" ? r.value.length : 0),
      0,
    );
    return `${okFeeds}/${list.length} feeds, ${items} items`;
  });
}
