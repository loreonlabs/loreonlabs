import "server-only";

import { serverEnv } from "@/lib/env";
import { httpJson, runService } from "./core";
import type { ServiceResponse } from "./types";

/**
 * Jina AI Reader — content extraction, webpage parsing, and article ingestion.
 *
 * Uses the r.jina.ai reader endpoint. Requires JINA_API_KEY for reliable,
 * rate-limited production use; returns a "disabled" fallback when absent.
 */

const READER_BASE = "https://r.jina.ai";
const TTL = 60 * 60 * 1000; // 1 hour

export interface ExtractedContent {
  url: string;
  title: string;
  content: string;
  /** Approximate word count of the extracted body. */
  words: number;
}

interface RawReader {
  code?: number;
  data?: {
    title?: string;
    url?: string;
    content?: string;
  };
}

const EMPTY: ExtractedContent = { url: "", title: "", content: "", words: 0 };

function headers(): Record<string, string> {
  const { jinaApiKey } = serverEnv();
  return {
    accept: "application/json",
    "x-return-format": "markdown",
    ...(jinaApiKey ? { authorization: `Bearer ${jinaApiKey}` } : {}),
  };
}

/** Extract clean content from a URL. */
export function extractContent(
  targetUrl: string,
): Promise<ServiceResponse<ExtractedContent>> {
  const { has } = serverEnv();
  return runService({
    enabled: has.jina,
    cacheKey: `jina:${targetUrl}`,
    ttlMs: TTL,
    fallback: { ...EMPTY, url: targetUrl },
    fetcher: async () => {
      const raw = await httpJson<RawReader>(
        `${READER_BASE}/${targetUrl}`,
        { headers: headers(), timeoutMs: 20_000 },
      );
      const content = raw.data?.content ?? "";
      return {
        url: raw.data?.url ?? targetUrl,
        title: raw.data?.title ?? "",
        content,
        words: content ? content.split(/\s+/).filter(Boolean).length : 0,
      };
    },
    isEmpty: (v) => v.content.length === 0,
  });
}

/** Alias for ingesting an article — same as extractContent. */
export const ingestArticle = extractContent;

/** Parse a webpage and return just its title + body text. */
export async function parseWebpage(
  targetUrl: string,
): Promise<ServiceResponse<ExtractedContent>> {
  return extractContent(targetUrl);
}
