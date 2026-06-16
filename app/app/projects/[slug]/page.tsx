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
import { projects } from "@/lib/data";
import {
  getProject,
  narrativesByIds,
  foundersByProject,
} from "@/lib/data/queries";
import { stageLabels, tierLabels, sourceLabels } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? p.name : "Project" };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const relatedNarratives = narrativesByIds(project.narrativeIds);
  const relatedFounders = foundersByProject(project.id);

  return (
    <>
      <div className="mb-4">
        <BackLink href="/projects" label="Projects" />
      </div>

      <PageHeader
        eyebrow={project.category}
        title={project.name}
        description={project.summary}
        actions={<TrendPill trend={project.trend} value={project.momentum} />}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{project.ecosystem}</Badge>
          <Badge tone="muted">{stageLabels[project.stage]}</Badge>
          <span className="t-meta ml-1">
            Sources: {project.sources.map((s) => sourceLabels[s]).join(" · ")}
          </span>
        </div>
      </PageHeader>

      <div className="page-section grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeader title="About" />
          <p className="t-body text-[15px]">{project.about}</p>

          <div className="mt-8">
            <SectionHeader title="Highlights" />
            <ul className="space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {relatedFounders.length > 0 && (
            <div className="mt-8">
              <SectionHeader title="Founders" />
              <div className="flex flex-wrap gap-2">
                {relatedFounders.map((f) => (
                  <ContentCard
                    key={f.id}
                    href={`/founders/${f.id}`}
                    title={f.name}
                    description={f.focus}
                    className="w-full sm:w-[280px]"
                    trailing={
                      <span className="font-mono text-sm font-semibold text-accent">
                        {f.signalScore}
                      </span>
                    }
                    tags={<Badge tone="accent">{f.handle}</Badge>}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="rounded-2xl border border-border/70 bg-surface/50 p-5">
          <div className="flex items-end justify-between">
            <div>
              <div className="font-mono text-3xl font-semibold text-foreground">
                {project.attentionScore}
              </div>
              <div className="t-meta">attention score</div>
            </div>
            <TrendPill trend={project.trend} value={project.momentum} />
          </div>
          <dl className="mt-5 space-y-3 border-t border-border/60 pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Ecosystem</dt>
              <dd className="text-foreground">{project.ecosystem}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Stage</dt>
              <dd className="text-foreground">{stageLabels[project.stage]}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Category</dt>
              <dd className="text-foreground">{project.category}</dd>
            </div>
          </dl>
        </aside>
      </div>

      {relatedNarratives.length > 0 && (
        <section className="page-section">
          <SectionHeader
            title="Related narratives"
            description="Themes this project contributes to."
          />
          <div className="card-grid">
            {relatedNarratives.map((n) => (
              <ContentCard
                key={n.id}
                href={`/narratives/${n.id}`}
                title={n.name}
                description={n.summary}
                trailing={<TrendPill trend={n.trend} value={n.momentum} />}
                tags={
                  <>
                    <Badge tone="accent">{n.category}</Badge>
                    <Badge>{tierLabels[n.tier]}</Badge>
                  </>
                }
                footer={<ScoreBar score={n.attentionScore} className="w-full" />}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
