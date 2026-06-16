import Link from "next/link";
import { PageHeader, SectionHeader } from "@/components/ui";
import { IntelFallback } from "@/components/ui/States";
import { TrendPill } from "@/components/ui";
import { getDiscovery } from "@/lib/intel/discovery";
import { formatUsd, formatPct, formatCompact, timeAgo } from "@/lib/format";
import { ArrowRight, StarIcon, ExternalIcon } from "@/components/icons";

export const dynamic = "force-dynamic";
export const revalidate = 120;

function trend(c: number): "up" | "down" | "flat" {
  return c > 0.05 ? "up" : c < -0.05 ? "down" : "flat";
}

export default async function OverviewPage() {
  const { status, data, error } = await getDiscovery();

  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Overview"
        description="A live cross-section of every source — trending markets, accelerating narratives, fast-moving projects, and the latest news. Everything here is real and clickable."
        actions={
          <Link href="/discovery" className="btn-primary px-4 py-2 text-[13px]">
            Open Discovery
            <ArrowRight width={15} height={15} />
          </Link>
        }
      />

      {status !== "ok" ? (
        <section className="page-section">
          <IntelFallback status={status} error={error} service="Live sources" />
        </section>
      ) : (
        <>
          <section className="page-section grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-surface/50 p-4">
              <SectionHeader title="Trending markets" actions={<Link href="/markets" className="text-sm font-medium text-accent hover:underline">Markets</Link>} />
              <div className="space-y-0.5">
                {data.gainers.slice(0, 6).map((a) => (
                  <Link key={a.id} href={`/markets/${a.id}`} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.image} alt="" width={20} height={20} className="h-5 w-5 rounded-full" />
                    <span className="min-w-0 flex-1 truncate text-sm text-foreground">{a.name}</span>
                    <span className="font-mono text-[13px] text-muted">{formatUsd(a.price)}</span>
                    <TrendPill trend={trend(a.change24h)} value={formatPct(a.change24h)} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-surface/50 p-4">
              <SectionHeader title="Accelerating narratives" actions={<Link href="/narratives" className="text-sm font-medium text-accent hover:underline">Narratives</Link>} />
              <div className="space-y-0.5">
                {data.narratives.slice(0, 6).map((n) => (
                  <Link key={n.id} href={`/narratives/${n.id}`} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface">
                    <span className="min-w-0 flex-1 truncate text-sm text-foreground">{n.name}</span>
                    <span className="text-[11px] text-muted">{n.articleCount} articles</span>
                    {n.recentCount > 0 && <TrendPill trend="up" value={`+${n.recentCount}`} />}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="page-section">
            <SectionHeader title="Fast-moving projects" actions={<Link href="/projects" className="text-sm font-medium text-accent hover:underline">All projects</Link>} />
            <div className="card-grid">
              {data.projects.map((p) => (
                <Link key={p.fullName} href={`/projects/${p.slug}`} className="hairline-top group flex h-full flex-col rounded-2xl border border-border/70 bg-surface/60 p-4 transition-colors hover:border-accent/40 hover:bg-surface">
                  <div className="truncate text-sm font-semibold text-foreground">{p.name}</div>
                  <p className="mt-1.5 line-clamp-2 text-[13px] text-muted">{p.description || "No description."}</p>
                  <div className="mt-auto flex items-center justify-between pt-3 text-[11px] text-muted">
                    <span className="inline-flex items-center gap-1"><StarIcon width={12} height={12} className="text-accent" />{formatCompact(p.stars)}</span>
                    <span>updated {timeAgo(p.pushedAt) || "recently"}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="page-section">
            <SectionHeader title="Latest news" actions={<Link href="/discovery" className="text-sm font-medium text-accent hover:underline">Discovery</Link>} />
            <ul className="space-y-2">
              {data.articles.map((a) => (
                <li key={a.url}>
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 p-3.5 transition-colors hover:border-accent/40">
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium text-foreground">{a.title}</div>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted">
                        <span className="text-accent">{a.source}</span>
                        {a.publishedAt && <span>{timeAgo(a.publishedAt)}</span>}
                      </div>
                    </div>
                    <ExternalIcon width={15} height={15} className="shrink-0 text-muted group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </>
  );
}
