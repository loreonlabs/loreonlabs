import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, SectionHeader, StatCard, Badge, BackLink, TrendPill } from "@/components/ui";
import { ExternalLinks } from "@/components/ui/ExternalLinks";
import { getMarketDetail } from "@/lib/intel/markets";
import { formatUsd, formatCompact, formatPct, timeAgo } from "@/lib/format";
import { ExternalIcon } from "@/components/icons";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { data } = await getMarketDetail(id);
  return { title: data ? `${data.token.name} (${data.token.symbol})` : "Market" };
}

function usd(n: number): string {
  return n > 0 ? `$${formatCompact(n)}` : "—";
}
function trend(c: number): "up" | "down" | "flat" {
  return c > 0.05 ? "up" : c < -0.05 ? "down" : "flat";
}

export default async function MarketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getMarketDetail(id);
  if (!data) notFound();

  const { token, related, ecosystems, narratives, news } = data;

  return (
    <>
      <div className="mb-4">
        <BackLink href="/markets" label="Markets" />
      </div>

      <PageHeader
        eyebrow={`${token.rank ? `Rank #${token.rank} · ` : ""}${token.symbol}`}
        title={token.name}
        description={token.description || `Live market overview for ${token.name}.`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {token.image && <img src={token.image} alt="" width={24} height={24} className="h-6 w-6 rounded-full" />}
            {token.categories.slice(0, 4).map((c) => (
              <Badge key={c}>{c}</Badge>
            ))}
          </div>
          <ExternalLinks
            links={[
              { kind: "website", label: "Website", href: token.links.website ?? "" },
              { kind: "external", label: "Explorer", href: token.links.explorer ?? "" },
              { kind: "github", label: "GitHub", href: token.links.github ?? "" },
              { kind: "twitter", label: "X", href: token.links.twitter ?? "" },
              { kind: "coingecko", label: "Market source", href: `https://www.coingecko.com/en/coins/${token.id}` },
            ]}
          />
        </div>
      </PageHeader>

      <section className="page-section">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Price" value={formatUsd(token.price)} />
          <StatCard label="24h" value={formatPct(token.change24h)} trend={token.change24h >= 0 ? "up" : "down"} />
          <StatCard label="7d" value={formatPct(token.change7d)} trend={token.change7d >= 0 ? "up" : "down"} />
          <StatCard label="30d" value={formatPct(token.change30d)} trend={token.change30d >= 0 ? "up" : "down"} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Market cap" value={usd(token.marketCap)} />
          <StatCard label="FDV" value={usd(token.fdv)} />
          <StatCard label="24h volume" value={usd(token.volume)} />
          <StatCard label="Rank" value={token.rank ? `#${token.rank}` : "—"} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2">
          <StatCard label="Circulating supply" value={token.circulatingSupply ? `${formatCompact(token.circulatingSupply)} ${token.symbol}` : "—"} />
          <StatCard label="Total supply" value={token.totalSupply ? `${formatCompact(token.totalSupply)} ${token.symbol}` : "—"} />
        </div>
      </section>

      {(ecosystems.length > 0 || narratives.length > 0) && (
        <section className="page-section">
          <SectionHeader title="Context" description="Where this asset sits across the landscape." />
          <div className="flex flex-wrap gap-2">
            {ecosystems.map((e) => (
              <Link key={e.id} href={`/ecosystems/${e.id}`}><Badge tone="accent">{e.name}</Badge></Link>
            ))}
            {narratives.map((n) => (
              <Link key={n.id} href={`/research/${n.id}`}><Badge>{n.name}</Badge></Link>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Related assets" />
          <div className="card-grid">
            {related.map((a) => (
              <Link
                key={a.id}
                href={`/markets/${a.id}`}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/60 p-4 transition-colors hover:border-accent/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt="" width={28} height={28} className="h-7 w-7 rounded-full" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">{a.name}</div>
                  <div className="text-[11px] uppercase text-muted">{a.symbol}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[13px] text-foreground">{formatUsd(a.price)}</div>
                  <TrendPill trend={trend(a.change24h)} value={formatPct(a.change24h)} className="justify-end" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {news.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Recent news" description="Every item links to the original article." />
          <ul className="space-y-2">
            {news.map((a) => (
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
      )}
    </>
  );
}
