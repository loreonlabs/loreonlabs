import Link from "next/link";
import { PageHeader, SectionHeader, StatCard, Badge, BackLink } from "@/components/ui";
import { EmptyState } from "@/components/ui/States";
import type { NarrativeDetail } from "@/lib/intel/narratives";
import { timeAgo, formatCompact, stageLabels } from "@/lib/format";
import { ExternalIcon, StarIcon } from "@/components/icons";

/**
 * Shared narrative detail view. Rendered by both /research/[slug] and
 * /narratives/[slug] — `basePath` controls the back link + sibling narrative
 * links so each route stays internally consistent.
 */
export function NarrativeDetailView({
  data,
  basePath,
  backLabel,
}: {
  data: NarrativeDetail;
  basePath: string;
  backLabel: string;
}) {
  return (
    <>
      <div className="mb-4">
        <BackLink href={basePath} label={backLabel} />
      </div>

      <PageHeader eyebrow={data.category} title={data.name} description={data.summary}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Articles" value={String(data.allSources.length)} />
          <StatCard
            label="This week"
            value={String(data.recentCount)}
            delta={data.recentCount > 0 ? `+${data.recentCount}` : undefined}
            trend={data.recentCount > 0 ? "up" : "flat"}
          />
          <StatCard label="Latest" value={data.latestDate ? timeAgo(data.latestDate) : "—"} />
          <StatCard label="Ecosystems" value={String(data.relatedEcosystems.length || "—")} />
        </div>
      </PageHeader>

      {data.aiSummary && (
        <section className="page-section">
          <SectionHeader title="Why it matters" />
          <p className="t-body max-w-2xl text-[15px]">{data.aiSummary}</p>
        </section>
      )}

      {(data.relatedEcosystems.length > 0 || data.relatedNarratives.length > 0) && (
        <section className="page-section">
          <SectionHeader title="Connected" />
          <div className="flex flex-wrap gap-2">
            {data.relatedEcosystems.map((e) => (
              <Link key={e.id} href={`/ecosystems/${e.id}`}>
                <Badge tone="accent">{e.name}</Badge>
              </Link>
            ))}
            {data.relatedNarratives.map((n) => (
              <Link key={n.id} href={`${basePath}/${n.id}`}>
                <Badge>{n.name}</Badge>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="page-section">
        <SectionHeader
          title="Recently surfaced signals"
          description="Coverage over time — newest first. Every source links to the original."
        />
        {data.timeline.length === 0 ? (
          <EmptyState
            title="Loreon is still monitoring this signal."
            message="No dated coverage has surfaced yet. This page updates automatically as new sources are detected."
          />
        ) : (
          <ul className="space-y-2">
            {data.timeline.slice(0, 30).map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-border/60 bg-surface p-3.5 shadow-card transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium text-foreground">{s.title}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted">
                      <span className="text-accent-ink">{s.source}</span>
                      {s.publishedAt && <span>{timeAgo(s.publishedAt)}</span>}
                    </div>
                  </div>
                  <ExternalIcon width={15} height={15} className="shrink-0 text-muted group-hover:text-accent-ink" />
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
              <Link
                key={p.fullName}
                href={`/projects/${p.slug}`}
                className="hairline-top group flex h-full flex-col rounded-2xl border border-border/70 bg-surface p-4 shadow-card transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-2"
              >
                <div className="truncate text-sm font-semibold text-foreground">{p.name}</div>
                <p className="mt-1.5 line-clamp-2 text-[13px] text-muted">{p.description || "No description."}</p>
                <div className="mt-auto flex items-center justify-between pt-3 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <StarIcon width={12} height={12} className="text-accent-ink" />
                    {formatCompact(p.stars)}
                  </span>
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
              <Link
                key={b.login}
                href={`/builders/${b.login}`}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface p-3.5 shadow-card transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-accent/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.avatarUrl} alt="" width={36} height={36} className="h-9 w-9 rounded-full" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">{b.name ?? b.login}</div>
                  <div className="text-[11px] text-muted">
                    {formatCompact(b.contributions)} {b.featured ? "followers" : "commits"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
