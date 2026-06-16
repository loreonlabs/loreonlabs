import "server-only";

import type { ServiceResponse } from "./types";

/**
 * Server-only service runtime: an in-memory TTL cache, resilient HTTP helpers
 * (timeout + typed errors), and `runService` which wraps every call in the
 * standard ServiceResponse with safe fallbacks. Importing this in a client
 * component is a build error (server-only).
 */

/* ----------------------------- TTL cache ----------------------------- */

interface CacheEntry {
  expires: number;
  value: unknown;
}

const cacheStore = new Map<string, CacheEntry>();

/** Memoize an async producer by key for `ttlMs`. */
export async function withCache<T>(
  key: string,
  ttlMs: number,
  producer: () => Promise<T>,
): Promise<{ value: T; cached: boolean }> {
  const now = Date.now();
  const hit = cacheStore.get(key);
  if (hit && hit.expires > now) {
    return { value: hit.value as T, cached: true };
  }
  const value = await producer();
  cacheStore.set(key, { value, expires: now + ttlMs });
  return { value, cached: false };
}

export function clearServiceCache(): void {
  cacheStore.clear();
}

/* ------------------------------ HTTP -------------------------------- */

export class HttpError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

interface HttpOptions extends RequestInit {
  /** Abort the request after this many ms (default 10s). */
  timeoutMs?: number;
  /** Next.js fetch revalidation window in seconds. */
  revalidate?: number;
}

async function rawFetch(url: string, options: HttpOptions = {}): Promise<Response> {
  const { timeoutMs = 10_000, revalidate, headers, ...rest } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...rest,
      headers: {
        "user-agent": "LoreonLabs/1.0 (+https://loreonlabs.xyz)",
        ...headers,
      },
      signal: controller.signal,
      next: revalidate != null ? { revalidate } : undefined,
    });
    if (!res.ok) {
      throw new HttpError(`Request to ${url} failed (${res.status})`, res.status);
    }
    return res;
  } catch (err) {
    if (err instanceof HttpError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new HttpError(`Request to ${url} timed out`);
    }
    throw new HttpError(
      err instanceof Error ? err.message : `Request to ${url} failed`,
    );
  } finally {
    clearTimeout(timer);
  }
}

export async function httpJson<T>(url: string, options?: HttpOptions): Promise<T> {
  const res = await rawFetch(url, {
    ...options,
    headers: { accept: "application/json", ...options?.headers },
  });
  return (await res.json()) as T;
}

export async function httpText(url: string, options?: HttpOptions): Promise<string> {
  const res = await rawFetch(url, options);
  return await res.text();
}

/* --------------------------- runService ----------------------------- */

interface RunServiceOptions<T> {
  /** Whether the integration is configured/usable. */
  enabled: boolean;
  /** Stable cache key for this call. */
  cacheKey: string;
  /** Cache TTL in ms. */
  ttlMs: number;
  /** Fallback value used for disabled/error/empty outcomes. */
  fallback: T;
  /** The live fetch. */
  fetcher: () => Promise<T>;
  /** Optional emptiness test (defaults to empty-array detection). */
  isEmpty?: (value: T) => boolean;
}

function defaultIsEmpty(value: unknown): boolean {
  if (Array.isArray(value)) return value.length === 0;
  if (value == null) return true;
  return false;
}

/**
 * Execute a service call with caching, error handling, and safe fallbacks.
 * Never throws — always resolves to a ServiceResponse.
 */
export async function runService<T>(
  opts: RunServiceOptions<T>,
): Promise<ServiceResponse<T>> {
  if (!opts.enabled) {
    return { status: "disabled", data: opts.fallback };
  }
  try {
    const { value, cached } = await withCache(
      opts.cacheKey,
      opts.ttlMs,
      opts.fetcher,
    );
    const empty = (opts.isEmpty ?? defaultIsEmpty)(value);
    return { status: empty ? "empty" : "ok", data: value, cached };
  } catch (err) {
    return {
      status: "error",
      data: opts.fallback,
      error: err instanceof Error ? err.message : "Unknown service error",
    };
  }
}
