import type { ReactNode } from "react";
import { Reveal } from "../Reveal";
import { LayersIcon, ShieldCheck, BoltIcon, TrendUpIcon } from "../icons";
import { site } from "@/lib/site";

function CheckRow({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm text-muted">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent-ink">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="m5 12 5 5 9-11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {children}
    </li>
  );
}

/**
 * Coverage Intelligence Map — ecosystems routed into one intelligence layer,
 * with animated cyan signal paths flowing toward the hub. Hover glows a node.
 */
const coverageNodes = [
  { label: "Crypto", x: 18, y: 26 },
  { label: "AI", x: 50, y: 15 },
  { label: "Base", x: 82, y: 26 },
  { label: "Ethereum", x: 13, y: 58 },
  { label: "Solana", x: 87, y: 58 },
  { label: "DeFi", x: 33, y: 88 },
  { label: "Stablecoins", x: 67, y: 88 },
];

function EcosystemVisual() {
  return (
    <div className="panel relative aspect-[4/3] overflow-hidden p-5 shadow-card">
      <div className="absolute inset-0 bg-grid opacity-30 mask-radial" />
      <div className="absolute -inset-10 -z-10 bg-accent/[0.08] blur-3xl" />

      <div className="relative z-20 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          Coverage map
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-accent-ink">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          7 ecosystems · live
        </span>
      </div>

      {/* animated signal paths to the hub */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="cov-path" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#00D4FF" stopOpacity="0.12" />
            <stop offset="0.5" stopColor="#00D4FF" stopOpacity="0.7" />
            <stop offset="1" stopColor="#4F8CFF" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        {coverageNodes.map((n, i) => (
          <line
            key={i}
            x1="50"
            y1="52"
            x2={n.x}
            y2={n.y}
            stroke="url(#cov-path)"
            strokeWidth="1.4"
            strokeDasharray="6 6"
            className="animate-flow-dash"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* hub */}
      <span className="absolute left-1/2 top-[52%] z-10 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-accent/30 bg-surface text-accent-ink shadow-glow-sm">
        <LayersIcon width={22} height={22} />
      </span>

      {/* ecosystem nodes */}
      {coverageNodes.map((n) => (
        <span
          key={n.label}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          className="absolute z-10 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground shadow-card transition-all duration-300 ease-premium hover:-translate-y-[calc(50%+2px)] hover:border-accent/50 hover:shadow-glow-sm"
        >
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
          {n.label}
        </span>
      ))}
    </div>
  );
}

/**
 * Attention Signal — a rising, animated attention curve with a flowing trace
 * and a "before consensus" marker. Reads as live data, not a placeholder.
 */
function SignalVisual() {
  const line =
    "M0 122 L40 118 L80 120 L120 104 L160 110 L200 82 L240 88 L280 48 L320 18";
  return (
    <div className="panel relative aspect-[4/3] overflow-hidden p-5 shadow-card">
      <div className="absolute inset-0 bg-grid opacity-25 mask-radial" />
      <div className="absolute -inset-10 -z-10 bg-accent/[0.08] blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          Attention · 30d
        </span>
        <span className="flex items-center gap-1 font-mono text-[11px] font-semibold text-success-ink">
          <TrendUpIcon width={12} height={12} />
          Accelerating
        </span>
      </div>

      <svg
        className="relative z-10 mt-4 h-[56%] w-full"
        viewBox="0 0 320 150"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="att-fill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#00D4FF" stopOpacity="0.22" />
            <stop offset="1" stopColor="#00D4FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${line} L320 150 L0 150 Z`} fill="url(#att-fill)" />
        <path d={line} stroke="#00B4D8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {/* flowing signal trace */}
        <path d={line} stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.75" strokeDasharray="16 184" className="animate-flow-dash" vectorEffect="non-scaling-stroke" />
        <circle cx="200" cy="82" r="4" fill="#00D4FF" />
        <circle cx="200" cy="82" r="8" fill="#00D4FF" fillOpacity="0.18" className="animate-pulse-soft" />
      </svg>

      <div className="relative z-10 mt-1 flex items-center justify-between text-[10px] text-muted">
        <span>30 days ago</span>
        <span className="flex items-center gap-1 text-accent-ink">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
          surfaced before consensus
        </span>
      </div>

      <p className="relative z-10 mt-3 text-[11px] leading-relaxed text-muted">
        Corroborated across independent sources and momentum-weighted — so early
        movers stand out while it&apos;s still early.
      </p>
    </div>
  );
}

const rows = [
  {
    eyebrow: "Coverage",
    title: "See the whole landscape in one place.",
    body: "Stop stitching together feeds and dashboards. LoreonLabs unifies every ecosystem and theme into a single, comparable intelligence layer — so context is always one glance away.",
    points: [
      "Crypto, AI, and technology under one roof",
      "Normalized so everything is directly comparable",
      "Built to feel premium, calm, and enterprise-grade",
    ],
    visual: <EcosystemVisual />,
    reverse: false,
  },
  {
    eyebrow: "Signal",
    title: "Surface signal before it becomes consensus.",
    body: "Loreon is tuned for acceleration, not popularity. It corroborates signals across many independent sources to highlight what's gaining momentum while it's still early.",
    points: [
      "Multi-source corroboration over single-feed noise",
      "Momentum-weighted, so early movers stand out",
      "Transparent provenance on everything surfaced",
    ],
    visual: <SignalVisual />,
    reverse: true,
  },
];

export function FeatureShowcase() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[4%] top-1/3 h-80 w-80 rounded-full bg-accent-blue/[0.06] blur-[130px]"
      />
      <div className="container-page space-y-20 sm:space-y-28">
        {rows.map((row) => (
          <div
            key={row.title}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div className={row.reverse ? "lg:order-2" : ""}>
              <Reveal>
                <span className="badge">
                  <span className="text-accent-ink">
                    {row.reverse ? <ShieldCheck width={13} height={13} /> : <BoltIcon width={13} height={13} />}
                  </span>
                  {row.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-balance text-2xl font-semibold tracking-tight text-gradient sm:text-3xl md:text-[2.2rem] md:leading-[1.15]">
                  {row.title}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted">
                  {row.body}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <ul className="mt-6 space-y-3">
                  {row.points.map((p) => (
                    <CheckRow key={p}>{p}</CheckRow>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.2}>
                <a
                  href={site.appUrl}
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink transition-colors hover:text-accent-soft"
                >
                  Open App
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.1} className={row.reverse ? "lg:order-1" : ""}>
              {row.visual}
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
