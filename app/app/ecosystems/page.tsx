import type { Metadata } from "next";
import { PageHeader, SectionHeader, ContentCard, ScoreBar, TrendPill } from "@/components/ui";
import { ecosystems } from "@/lib/data";

export const metadata: Metadata = { title: "Ecosystems" };

export default function EcosystemsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ecosystems"
        title="Explore ecosystems"
        description="A live read on every ecosystem that matters — Base, Ethereum, Solana, AI, and DeFi — normalized into one comparable attention layer."
      />

      <section className="page-section">
        <SectionHeader
          title="Tracked ecosystems"
          description="Compare attention, active narratives, and tracked projects."
        />
        <div className="card-grid">
          {ecosystems.map((eco) => (
            <ContentCard
              key={eco.id}
              href={`/ecosystems/${eco.id}`}
              title={eco.name}
              description={eco.description}
              leading={
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-border/70 bg-background/60 font-mono text-sm font-semibold text-accent">
                  {eco.symbol}
                </span>
              }
              trailing={<TrendPill trend={eco.trend} />}
              footer={
                <div className="w-full">
                  <ScoreBar score={eco.attentionScore} />
                  <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
                    <span>
                      <span className="font-mono text-foreground">{eco.activeNarratives}</span>{" "}
                      narratives
                    </span>
                    <span>
                      <span className="font-mono text-foreground">{eco.trackedProjects}</span>{" "}
                      projects
                    </span>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </section>
    </>
  );
}
