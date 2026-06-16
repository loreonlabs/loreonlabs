import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Badge } from "@/components/ui";
import { IntelFallback } from "@/components/ui/States";
import { listBuilders } from "@/lib/intel/founders";
import { ECOSYSTEMS } from "@/lib/intel/config";
import { formatCompact } from "@/lib/format";

export const metadata: Metadata = { title: "Founders & Builders" };
export const dynamic = "force-dynamic";
export const revalidate = 600;

function chip(active: boolean) {
  return `rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
    active
      ? "border-accent/40 bg-accent/10 text-foreground"
      : "border-border bg-surface/40 text-muted hover:text-foreground"
  }`;
}

export default async function FoundersPage({
  searchParams,
}: {
  searchParams: Promise<{ ecosystem?: string }>;
}) {
  const sp = await searchParams;
  const ecosystem = ECOSYSTEMS.find((e) => e.id === sp.ecosystem)?.id;
  const { status, data, error } = await listBuilders({ ecosystem });

  return (
    <>
      <PageHeader
        eyebrow="Founders & Builders"
        title="Monitor builders gaining attention"
        description="Real builders sourced from GitHub — the most active contributors across each ecosystem's core repositories. Every profile is live and clickable."
      />

      <section className="page-section">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/founders" className={chip(!ecosystem)}>All ecosystems</Link>
          {ECOSYSTEMS.map((e) => (
            <Link key={e.id} href={`/founders?ecosystem=${e.id}`} className={chip(ecosystem === e.id)}>
              {e.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section">
        {status !== "ok" ? (
          <IntelFallback status={status} error={error} service="GitHub" />
        ) : (
          <div className="card-grid">
            {data.map((b) => (
              <Link
                key={b.login}
                href={`/founders/${b.login}`}
                className="hairline-top group flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/60 p-4 transition-colors hover:border-accent/40 hover:bg-surface"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.avatarUrl} alt="" width={44} height={44} className="h-11 w-11 rounded-full" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-foreground">{b.login}</div>
                  <div className="mt-0.5 flex flex-wrap gap-1">
                    {b.ecosystems.slice(0, 3).map((e) => (
                      <Badge key={e}>{ECOSYSTEMS.find((x) => x.id === e)?.name ?? e}</Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm font-semibold text-accent">{formatCompact(b.contributions)}</div>
                  <div className="text-[9px] uppercase tracking-wide text-muted">commits</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
