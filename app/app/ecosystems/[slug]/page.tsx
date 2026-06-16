import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PageHeader,
  SectionHeader,
  StatCard,
  ContentCard,
  Badge,
  ScoreBar,
  TrendPill,
  BackLink,
} from "@/components/ui";
import { ecosystems } from "@/lib/data";
import {
  getEcosystem,
  narrativesByEcosystem,
  projectsByEcosystem,
  foundersByEcosystem,
} from "@/lib/data/queries";
import { tierLabels, stageLabels } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return ecosystems.map((e) => ({ slug: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getEcosystem(slug);
  return { title: e ? e.name : "Ecosystem" };
}

export default async function EcosystemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ecosystem = getEcosystem(slug);
  if (!ecosystem) notFound();

  const relatedNarratives = narrativesByEcosystem(ecosystem.name);
  const relatedProjects = projectsByEcosystem(ecosystem.name);
  const relatedFounders = foundersByEcosystem(ecosystem.name);

  return (
    <>
      <div className="mb-4">
        <BackLink href="/app/ecosystems" label="Ecosystems" />
      </div>

      <PageHeader
        eyebrow="Ecosystem"
        title={ecosystem.name}
        description={ecosystem.description}
        actions={<TrendPill trend={ecosystem.trend} />}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard label="Attention" value={String(ecosystem.attentionScore)} />
          <StatCard label="Narratives" value={String(ecosystem.activeNarratives)} />
          <StatCard label="Projects" value={String(ecosystem.trackedProjects)} />
        </div>
      </PageHeader>

      <section className="page-section">
        <SectionHeader title="Overview" />
        <p className="t-body max-w-2xl text-[15px]">{ecosystem.overview}</p>
        <ul className="mt-5 space-y-2">
          {ecosystem.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>
      </section>

      {relatedNarratives.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Narratives" description={`Active in ${ecosystem.name}.`} />
          <div className="card-grid">
            {relatedNarratives.map((n) => (
              <ContentCard
                key={n.id}
                href={`/app/narratives/${n.id}`}
                title={n.name}
                description={n.summary}
                trailing={<TrendPill trend={n.trend} value={n.momentum} />}
                tags={<Badge>{tierLabels[n.tier]}</Badge>}
                footer={<ScoreBar score={n.attentionScore} className="w-full" />}
              />
            ))}
          </div>
        </section>
      )}

      {relatedProjects.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Projects" description={`Tracked in ${ecosystem.name}.`} />
          <div className="card-grid">
            {relatedProjects.map((p) => (
              <ContentCard
                key={p.id}
                href={`/app/projects/${p.id}`}
                title={p.name}
                description={p.summary}
                trailing={<TrendPill trend={p.trend} value={p.momentum} />}
                tags={<Badge tone="muted">{stageLabels[p.stage]}</Badge>}
                footer={<ScoreBar score={p.attentionScore} className="w-full" />}
              />
            ))}
          </div>
        </section>
      )}

      {relatedFounders.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Founders" description={`Active in ${ecosystem.name}.`} />
          <div className="card-grid">
            {relatedFounders.map((f) => (
              <ContentCard
                key={f.id}
                href={`/app/founders/${f.id}`}
                title={f.name}
                description={f.focus}
                trailing={
                  <span className="font-mono text-sm font-semibold text-accent">
                    {f.signalScore}
                  </span>
                }
                tags={<Badge tone="accent">{f.handle}</Badge>}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
