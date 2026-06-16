import "server-only";

import { serverEnv, requireKey } from "@/lib/env";
import { httpJson, withCache, health, type ApiHealth } from "./client";

/**
 * Jina AI Reader — content extraction, webpage parsing, article ingestion.
 * Reads JINA_API_KEY from the server env. Never hardcodes the key.
 */

const READER_BASE = "https://r.jina.ai";
const TTL = 60 * 60 * 1000;

export interface ExtractedContent {
  url: string;
  title: string;
  content: string;
  words: number;
}

interface RawReader {
  data?: { title?: string; url?: string; content?: string };
}

function headers(): Record<string, string> {
  const key = requireKey("JINA_API_KEY", serverEnv().jinaApiKey);
  return {
    accept: "application/json",
    authorization: `Bearer ${key}`,
    "x-return-format": "markdown",
  };
}

async function read(targetUrl: string): Promise<ExtractedContent> {
  const raw = await httpJson<RawReader>(`${READER_BASE}/${targetUrl}`, {
    headers: headers(),
    timeoutMs: 25_000,
  });
  const content = raw.data?.content ?? "";
  return {
    url: raw.data?.url ?? targetUrl,
    title: raw.data?.title ?? "",
    content,
    words: content ? content.split(/\s+/).filter(Boolean).length : 0,
  };
}

/** Extract clean content from a URL. */
export function extractContent(targetUrl: string): Promise<ExtractedContent> {
  return withCache(`jina:${targetUrl}`, TTL, () => read(targetUrl));
}

/** Parse a webpage (alias of extractContent). */
export const parseWebpage = extractContent;

/** Ingest an article (alias of extractContent). */
export const ingestArticle = extractContent;

/** Verify the Jina key works. */
export function testJina(): Promise<ApiHealth> {
  return health(async () => {
    const c = await read("https://example.com");
    return `${c.words} words extracted`;
  });
}
