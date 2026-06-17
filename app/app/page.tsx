import Link from "next/link";
import { PageHeader, SectionHeader, TrendPill } from "@/components/ui";
import { IntelFallback } from "@/components/ui/States";
import { getDiscovery } from "@/lib/intel/discovery";
import { listBuilders } from "@/lib/intel/builders";
import { listEcosystems } from "@/lib/intel/ecosystems";
import { formatUsd, formatPct, formatCompact, timeAgo } from "@/lib/format";
import { StarIcon, ExternalIcon } from "@/components/icons";

export const dynamic = "force-dynamic";
export const revalidate = 120;

function trend(c: number): "up" | "down" | "flat" {
  return c > 0.05 ? "up" : c < -0.05 ? "down" : "flat";
}

export default async function OverviewPage() {
  const [{ status, data, error }, buildersRes, ecosystemsRes] = await Promise.all([
    getDiscovery(),
    listBuilders({}),
    listEcosystems(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="What's gaining attention right now"
        description="A live cross-section — trending markets, accelerating narratives, fast-moving projects, and the latest news. Everything is real and clickable."
      />

      {status !== "ok" ? (
        <section className="page-section">
          <IntelFallback status={status} error={error} />
        </section>
      ) : (
        <>
          <section className="page-section grid gap-5 lg:grid-cols-2">
            <div className="research-surface p-4">
              <SectionHeader title="Trending markets" actions={<Link href="/markets" className="text-sm font-medium text-accent-ink hover:underline">Markets</Link>} />
              <div className="space-y-0.5">
                {data.gainers.slice(0, 6).map((a) => (
                  <Link key={a.id} href={`/markets/${a.id}`} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.image} alt="" width={20} height={20} className="h-5 w-5 rounded-full" />
                    <span className="min-w-0 flex-1 truncate text-sm text-foreground">{a.name}</span>
                    <span className="font-mono text-[13px] text-muted">{formatUsd(a.price)}</span>
                    <TrendPill trend={trend(a.change24h)} value={formatPct(a.change24h)} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="research-surface p-4">
              <SectionHeader title="Accelerating narratives" actions={<Link href="/research" className="text-sm font-medium text-accent-ink hover:underline">Research</Link>} />
              <div className="space-y-0.5">
                {data.narratives.slice(0, 6).map((n) => (
                  <Link key={n.id} href={`/research/${n.id}`} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface-2">
                    <span className="min-w-0 flex-1 truncate text-sm text-foreground">{n.name}</span>
                    <span className="text-[11px] text-muted">{n.articleCount} articles</span>
                    {n.recentCount > 0 && <TrendPill trend="up" value={`+${n.recentCount}`} />}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="page-section">
            <SectionHeader title="Fast-moving projects" actions={<Link href="/ecosystems" className="text-sm font-medium text-accent-ink hover:underline">Ecosystems</Link>} />
            <div className="card-grid">
              {data.projects.map((p) => (
                <Link key={p.fullName} href={`/projects/${p.slug}`} className="hairline-top group flex h-full flex-col rounded-2xl border border-border/70 bg-surface shadow-card p-4 transition-colors hover:border-accent/40 hover:bg-surface-2">
                  <div className="truncate text-sm font-semibold text-foreground">{p.name}</div>
                  <p className="mt-1.5 line-clamp-2 text-[13px] text-muted">{p.description || "No description."}</p>
                  <div className="mt-auto flex items-center justify-between pt-3 text-[11px] text-muted">
                    <span className="inline-flex items-center gap-1"><StarIcon width={12} height={12} className="text-accent-ink" />{formatCompact(p.stars)}</span>
                    <span>updated {timeAgo(p.pushedAt) || "recently"}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {ecosystemsRes.status === "ok" && ecosystemsRes.data.length > 0 && (
            <section className="page-section">
              <SectionHeader title="Ecosystem momentum" actions={<Link href="/ecosystems" className="text-sm font-medium text-accent-ink hover:underline">Ecosystems</Link>} />
              <div className="card-grid">
                {ecosystemsRes.data.slice(0, 6).map((e) => (
                  <Link key={e.id} href={`/ecosystems/${e.id}`} className="hairline-top group flex h-full flex-col rounded-2xl border border-border/70 bg-surface shadow-card p-4 transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-foreground">{e.name}</span>
                      {e.recentNews > 0 && <TrendPill trend="up" value={`+${e.recentNews}`} />}
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[13px] text-muted">{e.blurb}</p>
                    <div className="mt-auto pt-3 text-[11px] text-muted">{e.newsCount} signals tracked</div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {buildersRes.status === "ok" && buildersRes.data.length > 0 && (
            <section className="page-section">
              <SectionHeader title="Builder activity" actions={<Link href="/builders" className="text-sm font-medium text-accent-ink hover:underline">Builders</Link>} />
              <div className="card-grid">
                {buildersRes.data.slice(0, 6).map((b) => (
                  <Link key={b.login} href={`/builders/${b.login}`} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface p-3.5 shadow-card transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-accent/40">
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

          <section className="page-section">
            <SectionHeader title="Latest news" actions={<Link href="/research" className="text-sm font-medium text-accent-ink hover:underline">Research</Link>} />
            <ul className="space-y-2">
              {data.articles.map((a) => (
                <li key={a.url}>
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl border border-border/60 bg-surface p-3.5 transition-colors hover:border-accent/40">
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium text-foreground">{a.title}</div>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted">
                        <span className="text-accent-ink">{a.source}</span>
                        {a.publishedAt && <span>{timeAgo(a.publishedAt)}</span>}
                      </div>
                    </div>
                    <ExternalIcon width={15} height={15} className="shrink-0 text-muted group-hover:text-accent-ink" />
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
