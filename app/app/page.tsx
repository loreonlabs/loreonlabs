import type { ReactNode } from "react";
import Link from "next/link";
import { PageHeader, SectionHeader, StatCard, TrendPill, ScoreBar } from "@/components/ui";
import {
  narratives,
  projects,
  founders,
  ecosystems,
  marketMetrics,
  marketSignals,
} from "@/lib/data";
import { tierLabels, stageLabels } from "@/lib/format";
import { ArrowRight } from "@/components/icons";

// Derived dashboard slices (realistic, computed from the static data).
const topNarratives = [...narratives]
  .sort((a, b) => b.attentionScore - a.attentionScore)
  .slice(0, 4);
const emergingProjects = projects
  .filter((p) => p.stage === "emerging" || p.stage === "stealth")
  .slice(0, 4);
const topFounders = [...founders]
  .sort((a, b) => b.signalScore - a.signalScore)
  .slice(0, 4);
const topEcosystems = [...ecosystems]
  .sort((a, b) => b.attentionScore - a.attentionScore)
  .slice(0, 5);

function Panel({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-surface/50 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="t-section-title">{title}</h2>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-[13px] font-medium text-accent hover:underline"
        >
          View all
          <ArrowRight width={13} height={13} />
        </Link>
      </div>
      {children}
    </div>
  );
}

function Row({
  href,
  title,
  subtitle,
  score,
  trend,
  delta,
}: {
  href: string;
  title: string;
  subtitle: string;
  score: number;
  trend: "up" | "down" | "flat";
  delta?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-surface"
    >
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{title}</div>
        <div className="truncate text-[11px] text-muted">{subtitle}</div>
      </div>
      {delta && <TrendPill trend={trend} value={delta} />}
      <span className="w-8 text-right font-mono text-sm font-semibold text-accent">
        {score}
      </span>
      <ArrowRight
        width={14}
        height={14}
        className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
      />
    </Link>
  );
}

export default function AppOverviewPage() {
  const attentionIndex = marketMetrics[0];

  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Overview"
        description="A live read on where attention is forming — narratives, founders, projects, ecosystems, and markets, in one dashboard."
        actions={
          <Link href="/app/discovery" className="btn-primary px-4 py-2 text-[13px]">
            Open Discovery
            <ArrowRight width={15} height={15} />
          </Link>
        }
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard {...attentionIndex} />
          <StatCard label="Active Narratives" value={String(narratives.length)} delta="+2" trend="up" context="Tracked themes" />
          <StatCard label="Emerging Projects" value={String(emergingProjects.length)} delta="+1" trend="up" context="Early stage" />
          <StatCard label="Top Founders" value={String(founders.length)} delta="+1" trend="up" context="On the radar" />
        </div>
      </PageHeader>

      {/* Attention Score band */}
      <section className="page-section">
        <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="t-eyebrow">Attention Score</p>
              <div className="mt-2 flex items-end gap-3">
                <span className="font-mono text-4xl font-semibold tracking-tight text-foreground">
                  {attentionIndex.value}
                </span>
                <TrendPill
                  trend={attentionIndex.trend ?? "up"}
                  value={attentionIndex.delta}
                  className="mb-1.5"
                />
              </div>
              <p className="mt-1 text-sm text-muted">
                Composite attention across all tracked themes.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {marketMetrics.slice(1).map((m) => (
                <div key={m.label}>
                  <div className="font-mono text-xl font-semibold text-foreground">
                    {m.value}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two-column panels */}
      <section className="page-section grid gap-5 lg:grid-cols-2">
        <Panel title="Active Narratives" href="/app/narratives">
          <div className="space-y-0.5">
            {topNarratives.map((n) => (
              <Row
                key={n.id}
                href={`/app/narratives/${n.id}`}
                title={n.name}
                subtitle={`${n.category} · ${tierLabels[n.tier]}`}
                score={n.attentionScore}
                trend={n.trend}
                delta={n.momentum}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Emerging Projects" href="/app/projects">
          <div className="space-y-0.5">
            {emergingProjects.map((p) => (
              <Row
                key={p.id}
                href={`/app/projects/${p.id}`}
                title={p.name}
                subtitle={`${p.ecosystem} · ${stageLabels[p.stage]}`}
                score={p.attentionScore}
                trend={p.trend}
                delta={p.momentum}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Top Founders" href="/app/founders">
          <div className="space-y-0.5">
            {topFounders.map((f) => (
              <Row
                key={f.id}
                href={`/app/founders/${f.id}`}
                title={f.name}
                subtitle={f.focus}
                score={f.signalScore}
                trend={f.trend}
                delta={f.momentum}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Ecosystem Signals" href="/app/ecosystems">
          <div className="space-y-3 pt-1">
            {topEcosystems.map((e) => (
              <Link
                key={e.id}
                href={`/app/ecosystems/${e.id}`}
                className="block rounded-lg px-2 py-1.5 transition-colors hover:bg-surface"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{e.name}</span>
                  <TrendPill trend={e.trend} />
                </div>
                <ScoreBar score={e.attentionScore} />
              </Link>
            ))}
          </div>
        </Panel>
      </section>

      {/* Market Activity */}
      <section className="page-section">
        <SectionHeader
          title="Market Activity"
          description="Where attention is concentrating across sectors."
          actions={
            <Link href="/app/markets" className="text-sm font-medium text-accent hover:underline">
              Open Markets
            </Link>
          }
        />
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-surface/40">
          <table className="w-full text-sm">
            <tbody>
              {marketSignals.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-border/40 last:border-0 transition-colors hover:bg-surface/60"
                >
                  <td className="px-4 py-3.5 font-medium text-foreground">{s.label}</td>
                  <td className="hidden px-4 py-3.5 text-muted sm:table-cell">{s.context}</td>
                  <td className="px-4 py-3.5 text-right font-mono text-foreground">{s.value}</td>
                  <td className="px-4 py-3.5 text-right">
                    <TrendPill trend={s.trend} value={s.delta} className="justify-end" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
