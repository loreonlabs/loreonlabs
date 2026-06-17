/**
 * Zone URL resolution for subdomain routing.
 *
 * LoreonLabs is served as three zones on three hosts:
 *   - landing  →  loreonlabs.xyz            (internal routes at "/")
 *   - app      →  app.loreonlabs.xyz        (internal routes under "/app")
 *   - docs     →  docs.loreonlabs.xyz       (internal routes under "/docs")
 *
 * `middleware.ts` rewrites each subdomain onto its internal path prefix so the
 * visible URLs stay clean (e.g. app.loreonlabs.xyz/discovery → /app/discovery).
 *
 * Within a zone, links are zone-relative ("/discovery"). Links that cross zones
 * use the absolute URLs below so the browser changes host.
 *
 * Zone URLs come from the validated public env (NEXT_PUBLIC_SITE_URL /
 * NEXT_PUBLIC_APP_URL / NEXT_PUBLIC_DOCS_URL), defaulting to the production
 * https://loreonlabs.xyz domains. Hosts are classified by their `app.` /
 * `docs.` subdomain prefix, so the same model works across environments.
 */

import { publicEnv, rootDomain } from "./env";

export const ZONES = ["landing", "app", "docs"] as const;
export type Zone = (typeof ZONES)[number];

/** Internal path prefix each zone is rewritten to. */
export const ZONE_PREFIX: Record<Exclude<Zone, "landing">, string> = {
  app: "/app",
  docs: "/docs",
};

/** Root domain derived from NEXT_PUBLIC_SITE_URL. */
export const ROOT_DOMAIN = rootDomain;

/** Absolute base URL for each zone (from the public env). */
export const zoneUrls: Record<Zone, string> = {
  landing: publicEnv.siteUrl,
  app: publicEnv.appUrl,
  docs: publicEnv.docsUrl,
};

/**
 * Classify a request host into a zone by its subdomain prefix — works for the
 * production subdomains and any custom `app.` / `docs.` host.
 */
export function zoneFromHost(host: string | null | undefined): Zone {
  const hostname = (host ?? "").split(":")[0].toLowerCase();
  if (hostname === `app.${ROOT_DOMAIN}` || hostname.startsWith("app.")) {
    return "app";
  }
  if (hostname === `docs.${ROOT_DOMAIN}` || hostname.startsWith("docs.")) {
    return "docs";
  }
  return "landing";
}

/** True for the production apex or its www host. */
export function isPrimaryLandingHost(host: string | null | undefined): boolean {
  const hostname = (host ?? "").split(":")[0].toLowerCase();
  return hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`;
}
