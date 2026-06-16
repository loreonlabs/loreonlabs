import type { Metadata } from "next";
import { PageHeader, SectionHeader, StatCard, ContentCard, Badge } from "@/components/ui";
import { discoveryMetrics, discoveryItems } from "@/lib/data";
import { sourceLabels, typeLabel, tierLabels } from "@/lib/format";

export const metadata: Metadata = { title: "Discovery" };

export default function DiscoveryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Discovery"
        title="Find emerging opportunities"
        description="A unified feed of the highest-signal narratives, founders, projects, and market moves — ranked by attention before consensus forms."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {discoveryMetrics.map((m) => (
            <StatCard key={m.label} {...m} />
          ))}
        </div>
      </PageHeader>

      <section className="page-section">
        <SectionHeader
          title="Signal feed"
          description="Cross-type results, highest attention first."
        />
        <div className="card-grid">
          {discoveryItems.map((item) => (
            <ContentCard
              key={item.id}
              title={item.title}
              description={item.summary}
              trailing={
                <span className="font-mono text-sm font-semibold text-accent">
                  {item.attentionScore}
                </span>
              }
              tags={
                <>
                  <Badge tone="accent">{typeLabel(item.type)}</Badge>
                  {item.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </>
              }
              footer={
                <>
                  <span className="capitalize">{tierLabels[item.tier]}</span>
                  <span className="truncate">
                    {item.sources.map((s) => sourceLabels[s]).join(" · ")}
                  </span>
                </>
              }
            />
          ))}
        </div>
      </section>
    </>
  );
}
