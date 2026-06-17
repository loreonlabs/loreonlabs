import { NextResponse } from "next/server";
import { globalSearch } from "@/lib/intel/search";

/**
 * Global search endpoint (live). GET /api/search?q=...
 * Returns real results from GitHub, CoinGecko, and the curated theme set.
 * No secrets are exposed; keys are used server-side only.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  try {
    const results = await globalSearch(q);
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
