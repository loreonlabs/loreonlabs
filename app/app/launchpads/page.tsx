import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Badge } from "@/components/ui";
import { IntelFallback } from "@/components/ui/States";
import { listLaunchpads } from "@/lib/intel/launchpads";
import { ECOSYSTEMS } from "@/lib/intel/config";
import { faviconUrl } from "@/lib/format";

export const metadata: Metadata = { title: "Launchpads" };
export const dynamic = "force-dynamic";
export const revalidate = 600;

function chip(active: boolean) {
  return `rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
    active ? "border-accent/40 bg-accent/10 text-foreground" : "border-border bg-surface/40 text-muted hover:text-foreground"
  }`;
}

export default async function LaunchpadsPage({
  searchParams,
}: {
  searchParams: Promise<{ ecosystem?: string }>;
}) {
  const sp = await searchParams;
  const ecosystem = ECOSYSTEMS.find((e) => e.id === sp.ecosystem)?.id;
  const { status, data, error } = await listLaunchpads(ecosystem);

  return (
    <>
      <PageHeader
        eyebrow="Launchpads"
        title="The launchpad layer"
        description="Where new tokens and agents are born — the platforms driving onchain launches across Base and Solana. Every launchpad links to its official site and docs."
      />

      <section className="page-section">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/launchpads" className={chip(!ecosystem)}>All chains</Link>
          {ECOSYSTEMS.filter((e) => e.launchpadIds.length > 0).map((e) => (
            <Link key={e.id} href={`/launchpads?ecosystem=${e.id}`} className={chip(ecosystem === e.id)}>
              {e.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section">
        {status !== "ok" ? (
          <IntelFallback status={status} error={error} />
        ) : (
          <div className="card-grid">
            {data.map((l) => (
              <Link
                key={l.id}
                href={`/launchpads/${l.id}`}
                className="hairline-top group flex h-full flex-col rounded-2xl border border-border/70 bg-surface/60 p-5 transition-colors hover:border-accent/40 hover:bg-surface"
              >
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={faviconUrl(l.website)} alt="" width={32} height={32} className="h-8 w-8 rounded-lg bg-background/60" />
                  <div>
                    <div className="text-[15px] font-semibold text-foreground">{l.name}</div>
                    <Badge tone="accent">{l.chain}</Badge>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{l.description}</p>
                {l.recentNewsCount > 0 && (
                  <div className="mt-auto pt-3 text-[11px] text-muted">{l.recentNewsCount} recent mentions</div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
