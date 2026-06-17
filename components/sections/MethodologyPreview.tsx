import { SectionHeading } from "../SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../Reveal";
import { GlobeIcon, ShieldCheck, LayersIcon, ChartIcon, SparkIcon } from "../icons";
import { site } from "@/lib/site";

const steps = [
  {
    icon: GlobeIcon,
    step: "01",
    title: "Collect",
    body: "Pull signals from news, communities, developer activity, and markets — continuously.",
  },
  {
    icon: ShieldCheck,
    step: "02",
    title: "Validate",
    body: "Corroborate every signal across independent sources before it counts.",
  },
  {
    icon: LayersIcon,
    step: "03",
    title: "Correlate",
    body: "Cluster fragmented coverage into coherent narratives and entities.",
  },
  {
    icon: ChartIcon,
    step: "04",
    title: "Score",
    body: "Measure attention and momentum, weighted toward what's accelerating early.",
  },
  {
    icon: SparkIcon,
    step: "05",
    title: "Surface",
    body: "Rank and present actionable intelligence across every surface.",
  },
];

export function MethodologyPreview() {
  return (
    <section
      id="methodology"
      className="relative scroll-mt-24 border-y border-border/60 bg-background-secondary/80 py-16 backdrop-blur-sm sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Methodology"
          title="A real intelligence engine, end to end."
          description="A transparent five-stage pipeline turns noise from across the open web into ranked, trustworthy intelligence — every step is auditable."
        />

        <Stagger className="relative mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* connecting flow line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[2.4rem] hidden h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent lg:block" />
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.step}>
                <div className="discovery-card hairline-top relative h-full p-5">
                  <div className="flex items-center justify-between">
                    <span className="relative z-10 grid h-11 w-11 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-accent-ink">
                      <Icon width={18} height={18} />
                    </span>
                    <span className="font-mono text-xs text-muted/70">{s.step}</span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 text-center">
          <a href={`${site.docsUrl}/methodology`} className="btn-secondary">
            Read the methodology
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12h15M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
