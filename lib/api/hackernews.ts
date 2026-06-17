import "server-only";

import { serverEnv } from "@/lib/env";
import { httpJson, withCache, health, type ApiHealth } from "./client";

/**
 * Hacker News — top stories and item details. Uses HACKERNEWS_API_URL from the
 * server env (no key required).
 */

const TTL_LIST = 6 * 60 * 60 * 1000; // 6h feed cache
const TTL_ITEM = 6 * 60 * 60 * 1000;

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
export function getItem(id: number): Promise<HNItem | null> {
  return withCache(`hn:item:${id}`, TTL_ITEM, async () => {
    const raw = await httpJson<RawItem | null>(`${base()}/item/${id}.json`);
    return raw ? mapItem(raw) : null;
  });
}

async function stories(
  endpoint: "topstories" | "beststories" | "newstories",
  limit: number,
): Promise<HNItem[]> {
  return withCache(`hn:${endpoint}:${limit}`, TTL_LIST, async () => {
    const ids = await httpJson<number[]>(`${base()}/${endpoint}.json`);
    const slice = (ids ?? []).slice(0, limit);
    const items = await Promise.all(
      slice.map((id) =>
        httpJson<RawItem | null>(`${base()}/item/${id}.json`)
          .then((r) => (r ? mapItem(r) : null))
          .catch(() => null),
      ),
    );
    return items.filter((i): i is HNItem => i != null);
  });
}

/** Fetch the top stories (hydrated). */
export const getTopStories = (limit = 20) => stories("topstories", limit);
/** Fetch the best stories (hydrated). */
export const getBestStories = (limit = 20) => stories("beststories", limit);
/** Fetch the newest stories (hydrated). */
export const getNewStories = (limit = 20) => stories("newstories", limit);

/** Verify Hacker News connectivity. */
export function testHackerNews(): Promise<ApiHealth> {
  return health(async () => {
    const ids = await httpJson<number[]>(`${base()}/topstories.json`);
    return `${ids?.length ?? 0} top story ids`;
  });
}
