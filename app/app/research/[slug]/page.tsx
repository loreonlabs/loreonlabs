import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, SectionHeader, StatCard, Badge, BackLink } from "@/components/ui";
import { getNarrative } from "@/lib/intel/narratives";
import { themeById } from "@/lib/intel/config";
import { timeAgo, formatCompact, stageLabels } from "@/lib/format";
import { ExternalIcon, StarIcon } from "@/components/icons";

export const dynamic = "force-dynamic";
export const revalidate = 600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: themeById(slug)?.name ?? "Research" };
}

export default async function ResearchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await getNarrative(slug);
  if (!data) notFound();

  return (
    <>
      <div className="mb-4">
        <BackLink href="/research" label="Research" />
      </div>

      <PageHeader eyebrow={data.category} title={data.name} description={data.summary}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Articles" value={String(data.allSources.length)} />
          <StatCard label="This week" value={String(data.recentCount)} trend={data.recentCount > 0 ? "up" : "flat"} />
          <StatCard label="Latest" value={data.latestDate ? timeAgo(data.latestDate) : "—"} />
          <StatCard label="Ecosystems" value={String(data.relatedEcosystems.length || "—")} />
        </div>
      </PageHeader>

      {data.aiSummary && (
        <section className="page-section">
          <SectionHeader title="Executive summary" />
          <p className="t-body max-w-2xl text-[15px]">{data.aiSummary}</p>
        </section>
      )}

      {(data.relatedEcosystems.length > 0 || data.relatedNarratives.length > 0) && (
        <section className="page-section">
          <SectionHeader title="Connected" />
          <div className="flex flex-wrap gap-2">
            {data.relatedEcosystems.map((e) => (
              <Link key={e.id} href={`/ecosystems/${e.id}`}><Badge tone="accent">{e.name}</Badge></Link>
            ))}
            {data.relatedNarratives.map((n) => (
              <Link key={n.id} href={`/research/${n.id}`}><Badge>{n.name}</Badge></Link>
            ))}
          </div>
        </section>
      )}

      <section className="page-section">
        <SectionHeader title="Timeline" description="Coverage over time — newest first. Every source links to the original." />
        {data.timeline.length === 0 ? (
          <p className="t-body">Awaiting dated coverage.</p>
        ) : (
          <ul className="space-y-2">
            {data.timeline.slice(0, 30).map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 p-3.5 transition-colors hover:border-accent/40">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium text-foreground">{s.title}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted">
                      <span className="text-accent">{s.source}</span>
                      {s.publishedAt && <span>{timeAgo(s.publishedAt)}</span>}
                    </div>
                  </div>
                  <ExternalIcon width={15} height={15} className="shrink-0 text-muted group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {data.relatedProjects.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Related projects" />
          <div className="card-grid">
            {data.relatedProjects.map((p) => (
              <Link key={p.fullName} href={`/projects/${p.slug}`} className="hairline-top group flex h-full flex-col rounded-2xl border border-border/70 bg-surface/60 p-4 transition-colors hover:border-accent/40 hover:bg-surface">
                <div className="truncate text-sm font-semibold text-foreground">{p.name}</div>
                <p className="mt-1.5 line-clamp-2 text-[13px] text-muted">{p.description || "No description."}</p>
                <div className="mt-auto flex items-center justify-between pt-3 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1"><StarIcon width={12} height={12} className="text-accent" />{formatCompact(p.stars)}</span>
                  <Badge tone="muted">{stageLabels[p.stage]}</Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {data.relatedBuilders.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Related builders" />
          <div className="card-grid">
            {data.relatedBuilders.map((b) => (
              <Link key={b.login} href={`/builders/${b.login}`} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/60 p-3.5 transition-colors hover:border-accent/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.avatarUrl} alt="" width={36} height={36} className="h-9 w-9 rounded-full" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">{b.name ?? b.login}</div>
                  <div className="text-[11px] text-muted">{formatCompact(b.contributions)} {b.featured ? "followers" : "commits"}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
