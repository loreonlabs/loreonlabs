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
 * The root domain is configurable for custom domains and previews via
 * NEXT_PUBLIC_ROOT_DOMAIN. Locally, the *.localhost subdomains resolve to
 * 127.0.0.1 in all modern browsers, so the same model works in development.
 */

export const ZONES = ["landing", "app", "docs"] as const;
export type Zone = (typeof ZONES)[number];

/** Internal path prefix each zone is rewritten to. */
export const ZONE_PREFIX: Record<Exclude<Zone, "landing">, string> = {
  app: "/app",
  docs: "/docs",
};

export const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN?.trim() || "loreonlabs.xyz";

const isProd = process.env.NODE_ENV === "production";

/** Absolute base URL for each zone, environment-aware. */
export const zoneUrls: Record<Zone, string> = isProd
  ? {
      landing: `https://${ROOT_DOMAIN}`,
      app: `https://app.${ROOT_DOMAIN}`,
      docs: `https://docs.${ROOT_DOMAIN}`,
    }
  : {
      landing: "http://localhost:3000",
      app: "http://app.localhost:3000",
      docs: "http://docs.localhost:3000",
    };

/**
 * Classify a request host into a zone. Works for production subdomains,
 * *.localhost development, and custom domains (any `app.` / `docs.` host).
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
