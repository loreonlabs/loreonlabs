import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PageHeader,
  SectionHeader,
  ContentCard,
  Badge,
  ScoreBar,
  TrendPill,
  BackLink,
} from "@/components/ui";
import { narratives } from "@/lib/data";
import { getNarrative, projectsByNarrative } from "@/lib/data/queries";
import { tierLabels, sourceLabels, stageLabels } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return narratives.map((n) => ({ slug: n.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = getNarrative(slug);
  return { title: n ? n.name : "Narrative" };
}

export default async function NarrativeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const narrative = getNarrative(slug);
  if (!narrative) notFound();

  const relatedProjects = projectsByNarrative(narrative.id);

  return (
    <>
      <div className="mb-4">
        <BackLink href="/app/narratives" label="Narratives" />
      </div>

      <PageHeader
        eyebrow={narrative.category}
        title={narrative.name}
        description={narrative.summary}
        actions={<TrendPill trend={narrative.trend} value={narrative.momentum} />}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{tierLabels[narrative.tier]}</Badge>
          {narrative.ecosystems.map((e) => (
            <Badge key={e}>{e}</Badge>
          ))}
          <span className="t-meta ml-1">
            Sources: {narrative.sources.map((s) => sourceLabels[s]).join(" · ")}
          </span>
        </div>
      </PageHeader>

      <div className="page-section grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeader title="Thesis" />
          <p className="t-body text-[15px]">{narrative.thesis}</p>

          <div className="mt-8">
            <SectionHeader title="What's driving attention" />
            <ul className="space-y-2">
              {narrative.drivers.map((d) => (
                <li key={d} className="flex gap-2.5 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="rounded-2xl border border-border/70 bg-surface/50 p-5">
          <div className="flex items-end justify-between">
            <div>
              <div className="font-mono text-3xl font-semibold text-foreground">
                {narrative.attentionScore}
              </div>
              <div className="t-meta">attention score</div>
            </div>
            <TrendPill trend={narrative.trend} value={narrative.momentum} />
          </div>
          <div className="mt-5 space-y-3 border-t border-border/60 pt-5">
            {narrative.signalBreakdown.map((s) => (
              <ScoreBar key={s.label} score={s.score} label={s.label} />
            ))}
          </div>
        </aside>
      </div>

      {relatedProjects.length > 0 && (
        <section className="page-section">
          <SectionHeader
            title="Related projects"
            description="Projects associated with this narrative."
          />
          <div className="card-grid">
            {relatedProjects.map((p) => (
              <ContentCard
                key={p.id}
                href={`/app/projects/${p.id}`}
                title={p.name}
                description={p.summary}
                trailing={<TrendPill trend={p.trend} value={p.momentum} />}
                tags={
                  <>
                    <Badge tone="accent">{p.ecosystem}</Badge>
                    <Badge tone="muted">{stageLabels[p.stage]}</Badge>
                  </>
                }
                footer={<ScoreBar score={p.attentionScore} className="w-full" />}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
