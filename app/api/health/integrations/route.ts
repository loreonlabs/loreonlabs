import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { serverEnv } from "@/lib/env";
import { runIntegrationsHealth } from "@/lib/api/health";

/**
 * Internal health check for all integrations.
 *
 * GET /api/health/integrations
 *
 * Protected by HEALTHCHECK_TOKEN. Provide it as either:
 *   Authorization: Bearer <token>
 *   x-healthcheck-token: <token>
 *
 * Auth matrix:
 *  - token configured → must match, else 401 (no details exposed)
 *  - token NOT configured + production → 401 (never expose details publicly)
 *  - token NOT configured + development → allowed (local convenience)
 *
 * Errors are sanitized + key-redacted upstream; no secrets are ever returned.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isProd = process.env.NODE_ENV === "production";

function constantTimeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

function presentedToken(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7).trim();
  return req.headers.get("x-healthcheck-token");
}

const unauthorized = () =>
  NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

export async function GET(req: Request) {
  const { healthcheckToken } = serverEnv();

  if (healthcheckToken) {
    const presented = presentedToken(req);
    if (!presented || !constantTimeEqual(presented, healthcheckToken)) {
      return unauthorized();
    }
  } else if (isProd) {
    // No token configured in production → never expose integration details.
    return unauthorized();
  }

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
