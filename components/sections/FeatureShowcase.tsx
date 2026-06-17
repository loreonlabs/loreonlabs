import type { ReactNode } from "react";
import { Reveal } from "../Reveal";
import {
  LayersIcon,
  SparkIcon,
  GlobeIcon,
  ForumIcon,
  GitIcon,
  ChartIcon,
  ShieldCheck,
  BoltIcon,
} from "../icons";
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

/** Decorative ecosystem cluster — labels only, no data. */
function EcosystemVisual() {
  const items = ["Base", "Ethereum", "Solana", "AI", "DeFi", "Stablecoins"];
  return (
    <div className="panel hairline-top relative flex aspect-[4/3] items-center justify-center overflow-hidden p-6 shadow-card">
      <div className="absolute -inset-10 -z-10 bg-accent/5 blur-3xl" />
      <div className="absolute inset-0 bg-dots opacity-30" />
      <span className="absolute grid h-16 w-16 place-items-center rounded-2xl border border-accent/30 bg-background/80 text-accent-ink shadow-glow-sm">
        <LayersIcon width={26} height={26} />
      </span>
      <div className="relative grid w-full max-w-xs grid-cols-3 gap-2">
        {items.map((i) => (
          <span
            key={i}
            className="rounded-lg border border-border/70 bg-surface px-2 py-2 text-center text-[11px] font-medium text-muted backdrop-blur"
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Decorative source → signal flow — icons only, no data. */
function SignalVisual() {
  const sources = [GlobeIcon, ForumIcon, GitIcon, ChartIcon];
  return (
    <div className="panel hairline-top relative flex aspect-[4/3] items-center justify-center overflow-hidden p-6 shadow-card">
      <div className="absolute -inset-10 -z-10 bg-accent/5 blur-3xl" />
      <div className="absolute inset-0 bg-grid opacity-20 mask-radial" />
      <div className="relative flex w-full items-center justify-between gap-3">
        <div className="grid grid-cols-2 gap-2">
          {sources.map((Icon, i) => (
            <span
              key={i}
              className="grid h-10 w-10 place-items-center rounded-lg border border-border/70 bg-surface text-muted backdrop-blur"
            >
              <Icon width={16} height={16} />
            </span>
          ))}
        </div>
        <svg width="40" height="20" viewBox="0 0 40 20" className="text-accent-ink/50" fill="none">
          <path d="M2 10h32m0 0-6-5m6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-accent/30 bg-background/80 text-accent-ink shadow-glow-sm">
          <SparkIcon width={26} height={26} />
        </span>
      </div>
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
    <section className="relative py-24 sm:py-28">
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
