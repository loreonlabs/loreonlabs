/**
 * Environment architecture + runtime validation.
 *
 * Two clearly separated surfaces:
 *
 *  - `publicEnv`  — NEXT_PUBLIC_* values. Safe to read anywhere (server or
 *    browser). Validated as URLs at module load.
 *
 *  - `serverEnv()` — private values (API keys, source URLs). Lazily read and
 *    guarded so it can never run in the browser. Private keys are NEVER
 *    prefixed with NEXT_PUBLIC_, so Next.js does not inline them into client
 *    bundles. Each key is optional — services fall back safely when missing.
 *
 * Only `publicEnv` is referenced by client-imported modules; `serverEnv` is
 * consumed exclusively by the server-only services in lib/services/*.
 */

const isProd = process.env.NODE_ENV === "production";

function validatedUrl(value: string | undefined, fallback: string): string {
  const raw = value?.trim() || fallback;
  try {
    // throws on malformed URLs — fail fast with a clear message
    new URL(raw);
  } catch {
    throw new Error(
      `[env] Invalid URL: "${raw}". Check your NEXT_PUBLIC_*_URL values.`,
    );
  }
  return raw.replace(/\/+$/, "");
}

/** Client-safe public configuration. */
export const publicEnv = {
  siteUrl: validatedUrl(
    process.env.NEXT_PUBLIC_SITE_URL,
    isProd ? "https://loreonlabs.xyz" : "http://localhost:3000",
  ),
  appUrl: validatedUrl(
    process.env.NEXT_PUBLIC_APP_URL,
    isProd ? "https://app.loreonlabs.xyz" : "http://app.localhost:3000",
  ),
  docsUrl: validatedUrl(
    process.env.NEXT_PUBLIC_DOCS_URL,
    isProd ? "https://docs.loreonlabs.xyz" : "http://docs.localhost:3000",
  ),
} as const;

/** Root domain derived from the public site URL (used for host detection). */
export const rootDomain: string = (() => {
  try {
    return new URL(publicEnv.siteUrl).hostname.replace(/^www\./, "");
  } catch {
    return "loreonlabs.xyz";
  }
})();

/* ------------------------------------------------------------------ *
 * Server-only environment
 * ------------------------------------------------------------------ */

const DEFAULT_HACKERNEWS_API_URL = "https://hacker-news.firebaseio.com/v0";

const DEFAULT_RSS_FEEDS = [
  "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml",
  "https://decrypt.co/feed",
  "https://cointelegraph.com/rss",
  "https://cryptoslate.com/feed",
];

function clean(value: string | undefined): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}

export interface ServerEnv {
  readonly tavilyApiKey?: string;
  readonly coingeckoApiKey?: string;
  readonly githubToken?: string;
  readonly jinaApiKey?: string;
  readonly firecrawlApiKey?: string;
  readonly hackerNewsApiUrl: string;
  readonly rssFeeds: string[];
  /** Bearer token guarding the internal health-check route. */
  readonly healthcheckToken?: string;
  /** Availability flags for conditional behaviour + safe fallbacks. */
  readonly has: {
    readonly tavily: boolean;
    readonly coingecko: boolean;
    readonly github: boolean;
    readonly jina: boolean;
    readonly firecrawl: boolean;
  };
}

/**
 * Return a required server credential or throw a clear, server-side error.
 * Used by API clients so a missing key fails loudly (and never silently sends
 * an unauthenticated request). The error message contains only the variable
 * name — never a value.
 */
export function requireKey(name: string, value: string | undefined): string {
  if (!value || !value.trim()) {
    throw new Error(
      `[env] Missing required server environment variable: ${name}. ` +
        `Add it to .env.local (never commit it).`,
    );
  }
  return value;
}

let cached: ServerEnv | null = null;

/**
 * Read and validate the private server environment. Throws if ever called in
 * the browser — a hard guarantee that private keys stay server-side.
 */
export function serverEnv(): ServerEnv {
  if (typeof window !== "undefined") {
    throw new Error("[env] serverEnv() must never be called in the browser.");
  }
  if (cached) return cached;

  const tavilyApiKey = clean(process.env.TAVILY_API_KEY);
  const coingeckoApiKey = clean(process.env.COINGECKO_API_KEY);
  const githubToken = clean(process.env.GITHUB_TOKEN);
  const jinaApiKey = clean(process.env.JINA_API_KEY);
  const firecrawlApiKey = clean(process.env.FIRECRAWL_API_KEY);

  const rssFeeds = (clean(process.env.RSS_FEEDS)?.split(",") ?? DEFAULT_RSS_FEEDS)
    .map((s) => s.trim())
    .filter(Boolean);

  cached = {
    tavilyApiKey,
    coingeckoApiKey,
    githubToken,
    jinaApiKey,
    firecrawlApiKey,
    hackerNewsApiUrl: (
      clean(process.env.HACKERNEWS_API_URL) ?? DEFAULT_HACKERNEWS_API_URL
    ).replace(/\/+$/, ""),
    rssFeeds,
    healthcheckToken: clean(process.env.HEALTHCHECK_TOKEN),
    has: {
      tavily: Boolean(tavilyApiKey),
      coingecko: Boolean(coingeckoApiKey),
      github: Boolean(githubToken),
      jina: Boolean(jinaApiKey),
      firecrawl: Boolean(firecrawlApiKey),
    },
  };
  return cached;
}
