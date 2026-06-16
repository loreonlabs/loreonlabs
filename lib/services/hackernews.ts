import "server-only";

import { serverEnv } from "@/lib/env";
import { httpJson, runService } from "./core";
import type { ServiceResponse } from "./types";

/**
 * Hacker News — top / best / new stories and item details via the public
 * Firebase API (HACKERNEWS_API_URL). No key required; always enabled.
 */

const TTL_LIST = 5 * 60 * 1000; // 5 min
const TTL_ITEM = 10 * 60 * 1000; // 10 min

export interface HNItem {
  id: number;
  title: string;
  url: string | null;
  score: number;
  by: string;
  time: number;
  comments: number;
  type: string;
}

interface RawItem {
  id: number;
  title?: string;
  url?: string;
  score?: number;
  by?: string;
  time?: number;
  descendants?: number;
  type?: string;
}

function base(): string {
  return serverEnv().hackerNewsApiUrl;
}

function mapItem(r: RawItem): HNItem {
  return {
    id: r.id,
    title: r.title ?? "Untitled",
    url: r.url ?? null,
    score: r.score ?? 0,
    by: r.by ?? "unknown",
    time: r.time ?? 0,
    comments: r.descendants ?? 0,
    type: r.type ?? "story",
  };
}

/** Fetch a single item by id. */
export function getItem(id: number): Promise<ServiceResponse<HNItem | null>> {
  return runService<HNItem | null>({
    enabled: true,
    cacheKey: `hn:item:${id}`,
    ttlMs: TTL_ITEM,
    fallback: null,
    fetcher: async () => {
      const raw = await httpJson<RawItem | null>(`${base()}/item/${id}.json`, {
        revalidate: 600,
      });
      return raw ? mapItem(raw) : null;
    },
    isEmpty: (v) => v == null,
  });
}

async function fetchStories(
  endpoint: "topstories" | "beststories" | "newstories",
  limit: number,
): Promise<HNItem[]> {
  const ids = await httpJson<number[]>(`${base()}/${endpoint}.json`, {
    revalidate: 300,
  });
  const slice = (ids ?? []).slice(0, limit);
  const items = await Promise.all(
    slice.map((id) =>
      httpJson<RawItem | null>(`${base()}/item/${id}.json`, { revalidate: 300 })
        .then((r) => (r ? mapItem(r) : null))
        .catch(() => null),
    ),
  );
  return items.filter((i): i is HNItem => i != null);
}

function stories(
  endpoint: "topstories" | "beststories" | "newstories",
  limit: number,
): Promise<ServiceResponse<HNItem[]>> {
  return runService({
    enabled: true,
    cacheKey: `hn:${endpoint}:${limit}`,
    ttlMs: TTL_LIST,
    fallback: [] as HNItem[],
    fetcher: () => fetchStories(endpoint, limit),
  });
}

export const getTopStories = (limit = 20) => stories("topstories", limit);
export const getBestStories = (limit = 20) => stories("beststories", limit);
export const getNewStories = (limit = 20) => stories("newstories", limit);
