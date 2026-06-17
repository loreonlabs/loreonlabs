import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, SectionHeader } from "@/components/ui";
import { IntelFallback } from "@/components/ui/States";
import { TrendPill } from "@/components/ui";
import { getMarketsOverview, type MarketAsset } from "@/lib/intel/markets";
import { formatUsd, formatCompact, formatPct } from "@/lib/format";

export const metadata: Metadata = { title: "Markets" };
export const dynamic = "force-dynamic";
export const revalidate = 60;

function trend(change: number): "up" | "down" | "flat" {
  if (change > 0.05) return "up";
  if (change < -0.05) return "down";
  return "flat";
}

function AssetRow({ a }: { a: MarketAsset }) {
  return (
    <Link
      href={`/markets/${a.id}`}
      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-2"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={a.image} alt="" width={22} height={22} className="h-[22px] w-[22px] rounded-full" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{a.name}</div>
        <div className="text-[11px] uppercase text-muted">{a.symbol}</div>
      </div>
      <div className="text-right">
        <div className="font-mono text-sm text-foreground">{formatUsd(a.price)}</div>
        <TrendPill trend={trend(a.change24h)} value={formatPct(a.change24h)} className="justify-end" />
      </div>
    </Link>
  );
}

function Panel({ title, assets }: { title: string; assets: MarketAsset[] }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-surface shadow-card p-4">
      <h2 className="t-section-title mb-2">{title}</h2>
      <div className="space-y-0.5">
        {assets.map((a) => (
          <AssetRow key={a.id} a={a} />
        ))}
      </div>
    </div>
  );
}

export default async function MarketsPage() {
  const { status, data, error } = await getMarketsOverview();

  return (
    <>
      <PageHeader
        eyebrow="Markets"
        title="Monitor market attention"
        description="Live token and market data — gainers, losers, trending, and the largest assets by market cap. Every row opens a detail page."
      />

      <section className="page-section">
        {status !== "ok" ? (
          <IntelFallback status={status} error={error} />
        ) : (
          <>
            <div className="grid gap-5 lg:grid-cols-3">
              <Panel title="Top gainers (24h)" assets={data.gainers} />
              <Panel title="Top losers (24h)" assets={data.losers} />
              <Panel title="Market cap leaders" assets={data.volumeLeaders} />
            </div>

            {data.trending.length > 0 && (
              <div className="mt-5">
                <SectionHeader title="Trending" description="Most searched right now." />
                <div className="flex flex-wrap gap-2">
                  {data.trending.map((t) => (
                    <Link
                      key={t.id}
                      href={`/markets/${t.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.thumb} alt="" width={16} height={16} className="h-4 w-4 rounded-full" />
                      {t.name}
                      <span className="text-[11px] uppercase text-muted">{t.symbol}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5">
              <SectionHeader title="Top by market cap" />
              <div className="overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-card">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-left text-[11px] uppercase tracking-wide text-muted">
                      <th className="px-4 py-3 font-medium">#</th>
                      <th className="px-4 py-3 font-medium">Asset</th>
                      <th className="px-4 py-3 text-right font-medium">Price</th>
                      <th className="px-4 py-3 text-right font-medium">24h</th>
                      <th className="hidden px-4 py-3 text-right font-medium sm:table-cell">Market cap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topByMarketCap.map((a) => (
                      <tr key={a.id} className="border-b border-border/40 last:border-0 hover:bg-surface-2">
                        <td className="px-4 py-3 font-mono text-muted">{a.rank || "—"}</td>
                        <td className="px-4 py-3">
                          <Link href={`/markets/${a.id}`} className="flex items-center gap-2.5 font-medium text-foreground hover:text-accent-ink">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={a.image} alt="" width={20} height={20} className="h-5 w-5 rounded-full" />
                            {a.name}
                            <span className="text-[11px] uppercase text-muted">{a.symbol}</span>
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-foreground">{formatUsd(a.price)}</td>
                        <td className="px-4 py-3 text-right">
                          <TrendPill trend={trend(a.change24h)} value={formatPct(a.change24h)} className="justify-end" />
                        </td>
                        <td className="hidden px-4 py-3 text-right font-mono text-muted sm:table-cell">
                          {formatCompact(a.marketCap)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
