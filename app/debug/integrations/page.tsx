import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { runIntegrationsHealth } from "@/lib/api/health";

/**
 * Local integration status page. Development-only — returns 404 in production
 * so it is never publicly exposed. Shows status, response time, and (sanitized)
 * error message. Never displays API keys.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Integration status",
  robots: { index: false, follow: false },
};

export default async function IntegrationStatusPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const health = await runIntegrationsHealth();
  const entries = Object.entries(health.services);

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="t-eyebrow">Debug · local only</p>
          <h1 className="t-page-title mt-2">Integration status</h1>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${
            health.ok
              ? "border-accent/40 bg-accent/10 text-accent-ink"
              : "border-rose-500/40 bg-rose-500/10 text-rose-400"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              health.ok ? "bg-accent" : "bg-rose-400"
            }`}
          />
          {health.ok ? "All systems go" : "Degraded"}
        </span>
      </div>

      <p className="mt-2 text-sm text-muted">
        Generated {new Date(health.generatedAt).toLocaleString()}. Keys are never
        shown.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-[11px] uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Time</th>
              <th className="px-4 py-3 font-medium">Detail</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([name, s]) => (
              <tr
                key={name}
                className="border-b border-border/40 last:border-0 align-top"
              >
                <td className="px-4 py-3.5 font-medium capitalize text-foreground">
                  {name}
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 ${
                      s.ok ? "text-accent-ink" : "text-rose-400"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        s.ok ? "bg-accent" : "bg-rose-400"
                      }`}
                    />
                    {s.ok ? "ok" : "fail"}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right font-mono text-muted">
                  {s.ms}ms
                </td>
                <td className="px-4 py-3.5 text-muted">
                  {s.ok ? s.info ?? "—" : s.error ?? "unknown error"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 font-mono text-xs text-muted/70">
        JSON: <span className="text-accent-ink">/api/health/integrations</span>
      </p>
    </main>
  );
}
