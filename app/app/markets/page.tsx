import type { Metadata } from "next";
import { PageHeader, SectionHeader, StatCard, TrendPill } from "@/components/ui";
import { marketMetrics, marketSignals } from "@/lib/data";

export const metadata: Metadata = { title: "Markets" };

export default function MarketsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Markets"
        title="Monitor market attention"
        description="Where attention is concentrating across sectors — a composite of social velocity, developer activity, and market data."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {marketMetrics.map((m) => (
            <StatCard key={m.label} {...m} />
          ))}
        </div>
      </PageHeader>

      <section className="page-section">
        <SectionHeader
          title="Attention by sector"
          description="Relative attention across the themes Loreon tracks."
        />
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-surface/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-medium">Signal</th>
                <th className="px-4 py-3 text-right font-medium">Score</th>
                <th className="px-4 py-3 text-right font-medium">Change</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Context</th>
              </tr>
            </thead>
            <tbody>
              {marketSignals.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-border/40 last:border-0 transition-colors hover:bg-surface/60"
                >
                  <td className="px-4 py-3.5 font-medium text-foreground">{s.label}</td>
                  <td className="px-4 py-3.5 text-right font-mono text-foreground">
                    {s.value}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <TrendPill trend={s.trend} value={s.delta} className="justify-end" />
                  </td>
                  <td className="hidden px-4 py-3.5 text-muted sm:table-cell">{s.context}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
