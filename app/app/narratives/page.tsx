import type { Metadata } from "next";
import { PageHeader, SectionHeader, ContentCard, Badge, ScoreBar, TrendPill } from "@/components/ui";
import { narratives } from "@/lib/data";
import { tierLabels } from "@/lib/format";

export const metadata: Metadata = { title: "Narratives" };

export default function NarrativesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Narratives"
        title="Track growing narratives"
        description="Themes ranked by momentum across crypto, AI, and technology — so you see what's accelerating while it's still early."
      />

      <section className="page-section">
        <SectionHeader
          title="Tracked narratives"
          description="Attention score blends social velocity, developer activity, and market signals."
        />
        <div className="card-grid">
          {narratives.map((n) => (
            <ContentCard
              key={n.id}
              href={`/app/narratives/${n.id}`}
              title={n.name}
              description={n.summary}
              trailing={<TrendPill trend={n.trend} value={n.momentum} />}
              tags={
                <>
                  <Badge tone="accent">{n.category}</Badge>
                  <Badge>{tierLabels[n.tier]}</Badge>
                </>
              }
              footer={
                <div className="w-full">
                  <ScoreBar score={n.attentionScore} />
                  <p className="mt-2 truncate text-[11px] text-muted">
                    {n.ecosystems.join(" · ")}
                  </p>
                </div>
              }
            />
          ))}
        </div>
      </section>
    </>
  );
}
