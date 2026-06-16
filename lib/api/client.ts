import "server-only";

/**
 * Server-only HTTP client shared by every API integration.
 *
 * Provides: resilient fetch (timeout + typed errors), an in-memory TTL cache,
 * and a `health()` helper that times a probe and redacts anything that looks
 * like a credential from error messages. Importing this from a client component
 * is a build error (server-only).
 */

export class HttpError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

interface HttpOptions extends RequestInit {
  /** Abort after this many ms (default 12s). */
  timeoutMs?: number;
  /** Next.js fetch revalidation window in seconds. */
  revalidate?: number;
}

async function rawFetch(url: string, options: HttpOptions = {}): Promise<Response> {
  const { timeoutMs = 12_000, revalidate, headers, ...rest } = options;
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
      const body = await res.text().catch(() => "");
      throw new HttpError(
        `HTTP ${res.status} from ${safeUrl(url)}${body ? `: ${body.slice(0, 160)}` : ""}`,
        res.status,
      );
    }
    return res;
  } catch (err) {
    if (err instanceof HttpError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new HttpError(`Request to ${safeUrl(url)} timed out`);
    }
    throw new HttpError(
      err instanceof Error ? err.message : `Request to ${safeUrl(url)} failed`,
    );
  } finally {
    clearTimeout(timer);
  }
}

/** Strip query strings from URLs in error messages (avoid leaking key params). */
function safeUrl(url: string): string {
  const i = url.indexOf("?");
  return i === -1 ? url : url.slice(0, i);
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
  return res.text();
}

/* ------------------------------- cache ----------------------------- */

interface CacheEntry {
  expires: number;
  value: unknown;
}
const cacheStore = new Map<string, CacheEntry>();

export async function withCache<T>(
  key: string,
  ttlMs: number,
  producer: () => Promise<T>,
): Promise<T> {
  const now = Date.now();
  const hit = cacheStore.get(key);
  if (hit && hit.expires > now) return hit.value as T;
  const value = await producer();
  cacheStore.set(key, { value, expires: now + ttlMs });
  return value;
}

export function clearApiCache(): void {
  cacheStore.clear();
}

/* ------------------------------ health ----------------------------- */

export interface ApiHealth {
  ok: boolean;
  /** Round-trip time in ms. */
  ms: number;
  /** Non-sensitive info on success (e.g. "8 results"). */
  info?: string;
  /** Sanitized error message on failure. */
  error?: string;
}

/** Redact anything resembling an API key/token from a string. */
function redact(message: string): string {
  return message
    .replace(/tvly-[A-Za-z0-9._-]+/g, "tvly-[redacted]")
    .replace(/github_pat_[A-Za-z0-9._-]+/g, "github_pat_[redacted]")
    .replace(/ghp_[A-Za-z0-9]+/g, "ghp_[redacted]")
    .replace(/jina_[A-Za-z0-9]+/g, "jina_[redacted]")
    .replace(/\bCG-[A-Za-z0-9]+/g, "CG-[redacted]")
    .replace(/(api[_-]?key|token|authorization|bearer)\s*[:=]\s*\S+/gi, "$1=[redacted]");
}

/**
 * Run a probe, time it, and normalize the result into ApiHealth. Never throws.
 */
export async function health(
  probe: () => Promise<string | undefined>,
): Promise<ApiHealth> {
  const start = Date.now();
  try {
    const info = await probe();
    return { ok: true, ms: Date.now() - start, info };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, ms: Date.now() - start, error: redact(message) };
  }
}
