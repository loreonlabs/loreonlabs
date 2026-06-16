import type { Metadata } from "next";
import { PageHeader, ContentCard, Badge } from "@/components/ui";
import { IntelFallback } from "@/components/ui/States";
import { listNarratives } from "@/lib/intel/narratives";
import { timeAgo } from "@/lib/format";

export const metadata: Metadata = { title: "Narratives" };
export const dynamic = "force-dynamic";
export const revalidate = 600;

export default async function NarrativesPage() {
  const { status, data, error } = await listNarratives();

  return (
    <>
      <PageHeader
        eyebrow="Narratives"
        title="Track growing narratives"
        description="Themes clustered from live Hacker News and crypto news feeds. Article count and momentum (stories in the last 7 days) are computed from real, dated articles — no invented scores."
      />

      <section className="page-section">
        {status !== "ok" ? (
          <IntelFallback status={status} error={error} service="News feeds" />
        ) : (
          <div className="card-grid">
            {data.map((n) => (
              <ContentCard
                key={n.id}
                href={`/narratives/${n.id}`}
                title={n.name}
                description={
                  n.sources[0]?.title ?? "Monitoring sources for new coverage."
                }
                tags={
                  <>
                    <Badge tone="accent">{n.category}</Badge>
                    {n.recentCount > 0 && <Badge>{n.recentCount} this week</Badge>}
                  </>
                }
                footer={
                  <>
                    <span>{n.articleCount} article{n.articleCount === 1 ? "" : "s"}</span>
                    <span>{n.latestDate ? timeAgo(n.latestDate) : "—"}</span>
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
