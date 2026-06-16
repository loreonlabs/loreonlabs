import type { Metadata } from "next";
import { PageHeader, ContentCard, Badge } from "@/components/ui";
import { IntelFallback } from "@/components/ui/States";
import { listNarratives } from "@/lib/intel/narratives";
import { timeAgo } from "@/lib/format";

export const metadata: Metadata = { title: "Research" };
export const dynamic = "force-dynamic";
export const revalidate = 600;

export default async function ResearchPage() {
  const { status, data, error } = await listNarratives();

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Narratives, backed by real coverage"
        description="Each narrative is clustered from live news and developer sources. Momentum is the number of articles in the last 7 days — computed from real, dated coverage. Narratives without enough coverage are hidden."
      />

      <section className="page-section">
        {status !== "ok" ? (
          <IntelFallback status={status} error={error} empty={{ title: "No narratives with sufficient coverage", message: "Check back as new coverage lands." }} />
        ) : (
          <div className="card-grid">
            {data.map((n) => (
              <ContentCard
                key={n.id}
                href={`/research/${n.id}`}
                title={n.name}
                description={n.summary}
                tags={
                  <>
                    <Badge tone="accent">{n.category}</Badge>
                    {n.recentCount > 0 && <Badge>{n.recentCount} this week</Badge>}
                  </>
                }
                footer={
                  <>
                    <span>{n.articleCount} articles</span>
                    <span>{n.latestDate ? timeAgo(n.latestDate) : ""}</span>
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
