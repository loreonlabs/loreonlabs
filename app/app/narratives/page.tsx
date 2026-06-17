import type { Metadata } from "next";
import { PageHeader, ContentCard, Badge } from "@/components/ui";
import { IntelFallback } from "@/components/ui/States";
import { listNarratives } from "@/lib/intel/narratives";
import { timeAgo } from "@/lib/format";

export const metadata: Metadata = {
  title: "Narratives",
  description:
    "Emerging narratives clustered from live coverage — ranked by attention momentum.",
};
export const dynamic = "force-dynamic";
export const revalidate = 600;

export default async function NarrativesPage() {
  const { status, data, error } = await listNarratives();

  return (
    <>
      <PageHeader
        eyebrow="Narratives"
        title="What's gaining attention"
        description="Each narrative is clustered from live news and developer coverage. Momentum is the number of dated articles in the last 7 days — measured, never guessed. Narratives without enough coverage stay hidden."
      />

      <section className="page-section">
        {status !== "ok" ? (
          <IntelFallback
            status={status}
            error={error}
            empty={{
              title: "No narratives with sufficient coverage yet.",
              message:
                "Loreon hides narratives until real coverage corroborates them. Check back as new signals land.",
            }}
          />
        ) : (
          <div className="card-grid">
            {data.map((n) => (
              <ContentCard
                key={n.id}
                href={`/narratives/${n.id}`}
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
