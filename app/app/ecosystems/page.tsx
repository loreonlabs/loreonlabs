import type { Metadata } from "next";
import { PageHeader, ContentCard, Badge } from "@/components/ui";
import { IntelFallback } from "@/components/ui/States";
import { listEcosystems } from "@/lib/intel/ecosystems";

export const metadata: Metadata = { title: "Ecosystems" };
export const dynamic = "force-dynamic";
export const revalidate = 600;

export default async function EcosystemsPage() {
  const { status, data, error } = await listEcosystems();

  return (
    <>
      <PageHeader
        eyebrow="Ecosystems"
        title="Explore ecosystems"
        description="Base, Ethereum, Solana, AI, and DeFi — each page is built live from real projects, builders, narratives, and current news."
      />

      <section className="page-section">
        {status !== "ok" ? (
          <IntelFallback status={status} error={error} />
        ) : (
          <div className="card-grid">
            {data.map((e) => (
              <ContentCard
                key={e.id}
                href={`/ecosystems/${e.id}`}
                title={e.name}
                description={e.blurb}
                leading={
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-border/70 bg-background/60 font-mono text-sm font-semibold text-accent">
                    {e.symbol}
                  </span>
                }
                tags={e.recentNews > 0 ? <Badge tone="accent">{e.recentNews} news this week</Badge> : undefined}
                footer={
                  <>
                    <span>{e.newsCount} recent articles</span>
                    <span className="text-accent">Explore →</span>
                  </>
                }
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
