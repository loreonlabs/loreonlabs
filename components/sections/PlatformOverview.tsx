import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { GlobeIcon, LayersIcon, ChartIcon, PulseIcon, SparkIcon } from "../icons";

const stages = [
  {
    icon: GlobeIcon,
    label: "Sources",
    body: "News, communities, GitHub, and markets — ingested continuously.",
  },
  {
    icon: LayersIcon,
    label: "Signal Processing",
    body: "Clean, normalize, and corroborate every signal across sources.",
  },
  {
    icon: ChartIcon,
    label: "Attention Scoring",
    body: "Measure momentum, weighted toward what's accelerating early.",
  },
  {
    icon: PulseIcon,
    label: "Narrative Discovery",
    body: "Cluster fragmented coverage into ranked, coherent narratives.",
  },
  {
    icon: SparkIcon,
    label: "Output",
    body: "Surfaced across markets, builders, narratives, and ecosystems.",
  },
];

export function PlatformOverview() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-16 h-72 w-72 rounded-full bg-accent/[0.06] blur-[120px]"
      />
      <div className="container-page">
        <SectionHeading
          eyebrow="The platform"
          title="How attention becomes intelligence."
          description="A single pipeline turns scattered signals into ranked, trustworthy intelligence — every stage is real and auditable."
        />

        <Reveal className="relative mt-14">
          {/* animated flowing signal connecting the pipeline (desktop) */}
          <svg
            className="absolute inset-x-[9%] top-[2.55rem] hidden h-1 w-[82%] lg:block"
            viewBox="0 0 1000 4"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="0" y1="2" x2="1000" y2="2" stroke="#E2E8F0" strokeWidth="2" />
            <line
              x1="0"
              y1="2"
              x2="1000"
              y2="2"
              stroke="url(#pf-flow)"
              strokeWidth="2"
              strokeDasharray="16 12"
              className="animate-flow-dash"
            />
            <defs>
              <linearGradient id="pf-flow" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#00D4FF" />
                <stop offset="1" stopColor="#4F8CFF" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
            {stages.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="discovery-card group relative flex h-full flex-col p-5 text-center"
                >
                  <span className="relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-accent/20 bg-surface text-accent-ink shadow-glow-sm transition-transform duration-300 ease-premium group-hover:scale-105">
                    <Icon width={20} height={20} />
                  </span>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="font-mono text-[11px] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-sm font-semibold tracking-tight text-foreground">
                      {s.label}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{s.body}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <p className="mx-auto max-w-2xl text-center text-sm text-muted">
            Not a wallet analyzer, portfolio tracker, or trading app — a research and
            monitoring platform for what comes next.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
