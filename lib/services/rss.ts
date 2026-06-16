import "server-only";

import { serverEnv } from "@/lib/env";
import { httpText, runService } from "./core";
import type { ServiceResponse } from "./types";

/**
 * RSS aggregator — CoinDesk, Decrypt, Cointelegraph, CryptoSlate (configurable
 * via RSS_FEEDS). Lightweight, dependency-free XML parsing; resilient per-feed
 * so one broken feed never fails the aggregate.
 */

const TTL = 10 * 60 * 1000; // 10 min

export interface RssItem {
  title: string;
  link: string;
  source: string;
  summary: string;
  publishedAt: string; // ISO string ("" when unknown)
}

const SOURCE_NAMES: Record<string, string> = {
  "coindesk.com": "CoinDesk",
  "decrypt.co": "Decrypt",
  "cointelegraph.com": "Cointelegraph",
  "cryptoslate.com": "CryptoSlate",
};

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

/** Fetch and parse a single feed. */
export function getFeed(feedUrl: string): Promise<ServiceResponse<RssItem[]>> {
  return runService({
    enabled: true,
    cacheKey: `rss:${feedUrl}`,
    ttlMs: TTL,
    fallback: [] as RssItem[],
    fetcher: async () => {
      const xml = await httpText(feedUrl, {
        revalidate: 600,
        headers: { accept: "application/rss+xml, application/xml, text/xml" },
      });
      return parseFeed(xml, feedUrl);
    },
  });
}

/** Aggregate all configured feeds, newest first, deduped by link. */
export function getAggregatedFeed(
  limit = 30,
): Promise<ServiceResponse<RssItem[]>> {
  const { rssFeeds } = serverEnv();
  return runService({
    enabled: rssFeeds.length > 0,
    cacheKey: `rss:all:${limit}`,
    ttlMs: TTL,
    fallback: [] as RssItem[],
    fetcher: async () => {
      const results = await Promise.all(
        rssFeeds.map((feed) =>
          httpText(feed, {
            revalidate: 600,
            headers: { accept: "application/rss+xml, application/xml, text/xml" },
          })
            .then((xml) => parseFeed(xml, feed))
            .catch(() => [] as RssItem[]),
        ),
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
    },
  });
}

/** List of configured feed sources (for UI / docs). */
export function listSources(): { url: string; name: string }[] {
  return serverEnv().rssFeeds.map((url) => ({ url, name: sourceName(url) }));
}
