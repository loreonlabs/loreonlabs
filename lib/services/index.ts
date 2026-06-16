/**
 * Server-only service layer. Import these from Server Components, Route
 * Handlers, or Server Actions only — each module is `server-only` and reads
 * private credentials from the server environment.
 *
 * Not wired into UI pages yet; this is the clean data/service foundation.
 */
export type { ServiceResponse, ServiceStatus } from "./types";
export { isOk, isUnavailable } from "./types";

export * as tavily from "./tavily";
export * as coingecko from "./coingecko";
export * as github from "./github";
export * as jina from "./jina";
export * as hackernews from "./hackernews";
export * as rss from "./rss";
