import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ZONE_PREFIX,
  zoneFromHost,
  zoneUrls,
  isPrimaryLandingHost,
} from "@/lib/urls";

/**
 * Subdomain routing (Next.js proxy — the current name for the former
 * "middleware" file convention; runs on the Edge before rendering).
 *
 * - app.*  → internally rewritten under "/app"  (URL stays clean)
 * - docs.* → internally rewritten under "/docs" (URL stays clean)
 * - apex / www → landing only; any /app or /docs paths are sent to the
 *   matching subdomain so there is a single clean home for each zone.
 * - other hosts (previews, plain localhost) → served as-is.
 *
 * Rewrites (not redirects) keep the visible host + path unchanged for the
 * subdomains, satisfying the "clean URL" requirement.
 */
export function proxy(req: NextRequest) {
  const host = req.headers.get("host");
  const zone = zoneFromHost(host);
  const { pathname, search } = req.nextUrl;

  if (zone === "app" || zone === "docs") {
    const prefix = ZONE_PREFIX[zone];

    // Already targeting the internal prefix — serve as-is (idempotent).
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return NextResponse.next();
    }

    const url = req.nextUrl.clone();
    url.pathname = pathname === "/" ? prefix : `${prefix}${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Landing zone. On the canonical apex/www, push zone paths to their
  // subdomains so each zone has one clean home.
  if (isPrimaryLandingHost(host)) {
    if (pathname === "/app" || pathname.startsWith("/app/")) {
      const dest = new URL(pathname.replace(/^\/app/, "") || "/", zoneUrls.app);
      dest.search = search;
      return NextResponse.redirect(dest);
    }
    if (pathname === "/docs" || pathname.startsWith("/docs/")) {
      const dest = new URL(pathname.replace(/^\/docs/, "") || "/", zoneUrls.docs);
      dest.search = search;
      return NextResponse.redirect(dest);
    }
  }

  return NextResponse.next();
}

export const config = {
  /**
   * Run on everything except Next internals, the API, and files with an
   * extension (static assets in /public, favicons, images, etc.).
   */
  matcher: ["/((?!_next/|api/|.*\\.).*)"],
};
