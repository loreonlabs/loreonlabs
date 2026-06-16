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
import { founders } from "@/lib/data";
import { getFounder, projectsByIds } from "@/lib/data/queries";
import { stageLabels } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return founders.map((f) => ({ slug: f.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = getFounder(slug);
  return { title: f ? f.name : "Founder" };
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function FounderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const founder = getFounder(slug);
  if (!founder) notFound();

  const relatedProjects = projectsByIds(founder.projectIds);

  return (
    <>
      <div className="mb-4">
        <BackLink href="/app/founders" label="Founders" />
      </div>

      <PageHeader
        eyebrow={founder.handle}
        title={founder.name}
        description={founder.focus}
        actions={<TrendPill trend={founder.trend} value={founder.momentum} />}
      >
        <div className="flex flex-wrap items-center gap-2">
          {founder.ecosystems.map((e) => (
            <Badge key={e}>{e}</Badge>
          ))}
        </div>
      </PageHeader>

      <div className="page-section grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-base font-semibold text-accent">
              {initials(founder.name)}
            </span>
            <div>
              <SectionHeader title="About" />
              <p className="t-body text-[15px]">{founder.bio}</p>
            </div>
          </div>

          <div className="mt-8">
            <SectionHeader title="Why they're on the radar" />
            <ul className="space-y-2">
              {founder.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="rounded-2xl border border-border/70 bg-surface/50 p-5">
          <div className="flex items-end justify-between">
            <div>
              <div className="font-mono text-3xl font-semibold text-foreground">
                {founder.signalScore}
              </div>
              <div className="t-meta">signal score</div>
            </div>
            <TrendPill trend={founder.trend} value={founder.momentum} />
          </div>
          <div className="mt-5 space-y-3 border-t border-border/60 pt-5">
            {founder.signalBreakdown.map((s) => (
              <ScoreBar key={s.label} score={s.score} label={s.label} />
            ))}
          </div>
        </aside>
      </div>

      {relatedProjects.length > 0 && (
        <section className="page-section">
          <SectionHeader
            title="Projects"
            description="Projects this founder is associated with."
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
