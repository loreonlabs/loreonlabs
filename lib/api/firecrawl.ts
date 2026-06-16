import "server-only";

import { serverEnv, requireKey } from "@/lib/env";
import { httpJson, withCache, health, type ApiHealth } from "./client";

/**
 * Firecrawl — website / docs / blog / changelog crawling and content
 * extraction. Reads FIRECRAWL_API_KEY from the server env. Never hardcodes the
 * key; responses are cached aggressively (site content changes slowly).
 */

const BASE = "https://api.firecrawl.dev/v1";
const TTL = 12 * 60 * 60 * 1000; // 12 hours

export interface ScrapedPage {
  url: string;
  title: string;
  description: string;
  markdown: string;
  links: string[];
}

interface RawScrape {
  success?: boolean;
  data?: {
    markdown?: string;
    links?: string[];
    metadata?: {
      title?: string;
      description?: string;
      ogTitle?: string;
      ogDescription?: string;
      sourceURL?: string;
    };
  };
}

function authHeaders(): Record<string, string> {
  const key = requireKey("FIRECRAWL_API_KEY", serverEnv().firecrawlApiKey);
  return { authorization: `Bearer ${key}`, "content-type": "application/json" };
}

async function rawScrape(url: string): Promise<ScrapedPage> {
  const raw = await httpJson<RawScrape>(`${BASE}/scrape`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      url,
      formats: ["markdown", "links"],
      onlyMainContent: true,
      timeout: 20000,
    }),
    timeoutMs: 25_000,
  });
  const md = raw.data?.metadata;
  return {
    url: md?.sourceURL ?? url,
    title: md?.title ?? md?.ogTitle ?? "",
    description: md?.description ?? md?.ogDescription ?? "",
    markdown: raw.data?.markdown ?? "",
    links: (raw.data?.links ?? []).filter(Boolean),
  };
}

/** Scrape a single page → title, description, markdown, links. Cached 12h. */
export function scrape(url: string): Promise<ScrapedPage> {
  return withCache(`fc:scrape:${url}`, TTL, () => rawScrape(url));
}

interface RawMap {
  success?: boolean;
  links?: Array<string | { url?: string }>;
}

/** Map a site → list of discovered URLs (for docs/blog/changelog/ecosystem discovery). */
export function mapSite(url: string, limit = 60): Promise<string[]> {
  return withCache(`fc:map:${url}:${limit}`, TTL, async () => {
    const raw = await httpJson<RawMap>(`${BASE}/map`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ url, limit }),
      timeoutMs: 25_000,
    });
    return (raw.links ?? [])
      .map((l) => (typeof l === "string" ? l : l.url))
      .filter((l): l is string => Boolean(l));
  });
}

/** Verify the Firecrawl key works. */
export function testFirecrawl(): Promise<ApiHealth> {
  return health(async () => {
    const page = await rawScrape("https://example.com");
    return page.markdown ? "scrape ok" : "ok";
  });
}
