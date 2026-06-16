import type { Metadata } from "next";
import { PageHeader, SectionHeader, ContentCard, Badge, ScoreBar, TrendPill } from "@/components/ui";
import { projects } from "@/lib/data";
import { stageLabels } from "@/lib/format";
import { CompassIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Discover emerging projects"
        description="New and early projects scored on momentum and credibility — surfaced before they reach mainstream visibility."
      />

      <section className="page-section">
        <SectionHeader
          title="Emerging projects"
          description="Filtered for credibility and ranked by attention."
        />
        <div className="card-grid">
          {projects.map((p) => (
            <ContentCard
              key={p.id}
              href={`/app/projects/${p.id}`}
              title={p.name}
              description={p.summary}
              leading={
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-border/70 bg-background/60 text-accent">
                  <CompassIcon width={16} height={16} />
                </span>
              }
              trailing={<TrendPill trend={p.trend} value={p.momentum} />}
              tags={
                <>
                  <Badge tone="accent">{p.ecosystem}</Badge>
                  <Badge>{p.category}</Badge>
                  <Badge tone="muted">{stageLabels[p.stage]}</Badge>
                </>
              }
              footer={<ScoreBar score={p.attentionScore} className="w-full" />}
            />
          ))}
        </div>
      </section>
    </>
  );
}
