import { SectionHeading } from "../SectionHeading";
import { Stagger, StaggerItem } from "../Reveal";
import {
  GlobeIcon,
  RadarIcon,
  ShieldCheck,
  LayersIcon,
  ChartIcon,
  SparkIcon,
} from "../icons";

/**
 * Methodology section — the Loreon intelligence pipeline. Six numbered stages
 * mounted on an animated flowing signal spine. New structure (flowing node
 * timeline), replacing the old static methodology cards. Keeps id=methodology
 * for the landing nav scroll target.
 */
const stages = [
  { icon: GlobeIcon, title: "Sources", body: "News, communities, GitHub, and markets — ingested continuously." },
  { icon: RadarIcon, title: "Discovery", body: "Scan the open web for what's emerging, not what's already obvious." },
  { icon: ShieldCheck, title: "Validation", body: "Corroborate every signal across independent sources before it counts." },
  { icon: LayersIcon, title: "Correlation", body: "Cluster fragmented coverage into coherent narratives and entities." },
  { icon: ChartIcon, title: "Scoring", body: "Weight by attention and momentum, so early movers stand out." },
  { icon: SparkIcon, title: "Narrative Surface", body: "Rank and surface trustworthy intelligence across the platform." },
];

export function IntelligencePipeline() {
  return (
    <section
      id="methodology"
      className="relative scroll-mt-24 border-y border-border/60 bg-background-secondary/70 py-16 backdrop-blur-sm sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Methodology"
          title="The Loreon intelligence pipeline."
          description="Six stages turn raw, scattered signals into ranked intelligence — every step auditable, every signal traceable."
        />

        <div className="relative mt-16">
          {/* desktop flowing spine */}
          <svg
            className="absolute inset-x-[8.3%] top-[1.7rem] hidden h-2 w-[83.4%] lg:block"
            viewBox="0 0 1000 8"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="0" y1="4" x2="1000" y2="4" stroke="#E2E8F0" strokeWidth="2" />
            <line
              x1="0"
              y1="4"
              x2="1000"
              y2="4"
              stroke="url(#pipe-flow)"
              strokeWidth="2"
              strokeDasharray="16 10"
              className="animate-flow-dash"
            />
            <defs>
              <linearGradient id="pipe-flow" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#00D4FF" />
                <stop offset="1" stopColor="#4F8CFF" />
              </linearGradient>
            </defs>
          </svg>

          <Stagger className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {stages.map((s, i) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.title}>
                  <div className="group relative text-center">
                    <div className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-accent/25 bg-surface text-accent-ink shadow-glow-sm transition-transform duration-300 ease-premium group-hover:-translate-y-1.5">
                      <Icon width={22} height={22} />
                      <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-[#04121f] shadow-glow-sm">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-sm font-semibold tracking-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="mx-auto mt-1.5 max-w-[12rem] text-[12.5px] leading-relaxed text-muted">
                      {s.body}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
