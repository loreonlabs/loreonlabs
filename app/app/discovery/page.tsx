import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, SectionHeader, Badge } from "@/components/ui";
import { IntelFallback } from "@/components/ui/States";
import { TrendPill } from "@/components/ui";
import { getDiscovery } from "@/lib/intel/discovery";
import { formatPct, formatCompact, timeAgo } from "@/lib/format";
import { StarIcon, ExternalIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Discovery" };
export const dynamic = "force-dynamic";
export const revalidate = 120;

function trend(c: number): "up" | "down" | "flat" {
  return c > 0.05 ? "up" : c < -0.05 ? "down" : "flat";
}

export default async function DiscoveryPage() {
  const { status, data, error } = await getDiscovery();

  return (
    <>
      <PageHeader
        eyebrow="Discovery"
        title="Find emerging opportunities"
        description="The live front door — trending tokens, newest articles, and fast-moving projects pulled from CoinGecko, GitHub, Hacker News, and crypto news feeds in real time."
      />

      {status !== "ok" ? (
        <section className="page-section">
          <IntelFallback status={status} error={error} service="Live sources" />
        </section>
      ) : (
        <>
          {data.trending.length > 0 && (
            <section className="page-section">
              <SectionHeader title="Trending now" description="Most-searched assets on CoinGecko." />
              <div className="flex flex-wrap gap-2">
                {data.trending.map((t) => (
                  <Link key={t.id} href={`/markets/${t.id}`} className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/60 px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.thumb} alt="" width={16} height={16} className="h-4 w-4 rounded-full" />
                    {t.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="page-section grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-surface/50 p-4">
              <SectionHeader title="Biggest movers (24h)" actions={<Link href="/markets" className="text-sm font-medium text-accent hover:underline">Markets</Link>} />
              <div className="space-y-0.5">
                {data.gainers.map((a) => (
                  <Link key={a.id} href={`/markets/${a.id}`} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.image} alt="" width={20} height={20} className="h-5 w-5 rounded-full" />
                    <span className="min-w-0 flex-1 truncate text-sm text-foreground">{a.name}</span>
                    <TrendPill trend={trend(a.change24h)} value={formatPct(a.change24h)} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-surface/50 p-4">
              <SectionHeader title="Fast-moving projects" actions={<Link href="/projects?sort=activity" className="text-sm font-medium text-accent hover:underline">Projects</Link>} />
              <div className="space-y-0.5">
                {data.projects.map((p) => (
                  <Link key={p.fullName} href={`/projects/${p.slug}`} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface">
                    <span className="min-w-0 flex-1 truncate text-sm text-foreground">{p.name}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                      <StarIcon width={12} height={12} className="text-accent" />{formatCompact(p.stars)}
                    </span>
                    <Badge tone="muted">{p.ecosystem || "—"}</Badge>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="page-section">
            <SectionHeader title="Latest across the web" description="Newest dated articles from all news sources." />
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
