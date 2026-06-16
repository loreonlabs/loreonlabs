import { NextResponse } from "next/server";
import { runIntegrationsHealth } from "@/lib/api/health";

/**
 * Internal health check for all integrations.
 *
 * GET /api/health/integrations
 *
 * Runs every probe in parallel; a single failing service never crashes the
 * route. Returns 200 when all are healthy, 503 otherwise. No secrets are ever
 * included in the response (errors are sanitized + key-redacted upstream).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await runIntegrationsHealth();
    return NextResponse.json(result, { status: result.ok ? 200 : 503 });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error:
          err instanceof Error ? err.message : "Integration health check failed",
      },
      { status: 500 },
    );
  }
}
