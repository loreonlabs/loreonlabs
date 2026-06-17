import { SectionHeading } from "../SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../Reveal";
import { GlobeIcon, LayersIcon, ShieldCheck, BoltIcon } from "../icons";
import { site } from "@/lib/site";

const steps = [
  {
    icon: GlobeIcon,
    step: "01",
    title: "Ingest",
    body: "Collect signals from across the open web, communities, developer activity, and markets.",
  },
  {
    icon: LayersIcon,
    step: "02",
    title: "Normalize",
    body: "Extract clean text and entities, then map everything to one shared schema.",
  },
  {
    icon: ShieldCheck,
    step: "03",
    title: "Score",
    body: "Measure attention and momentum, weighted toward what's accelerating early.",
  },
  {
    icon: BoltIcon,
    step: "04",
    title: "Surface",
    body: "Rank and present actionable intelligence across every surface of the platform.",
  },
];

export function MethodologyPreview() {
  return (
    <section id="methodology" className="relative scroll-mt-24 border-y border-border/60 bg-background-secondary/80 py-24 backdrop-blur-sm sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Methodology"
          title="From raw signal to actionable intelligence."
          description="A transparent pipeline turns noise from across the open web into ranked, trustworthy intelligence."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.step}>
                <div className="hairline-top relative h-full rounded-2xl border border-border/70 bg-surface p-5">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-border/70 bg-background/60 text-accent-ink">
                      <Icon width={18} height={18} />
                    </span>
                    <span className="font-mono text-xs text-muted/70">{s.step}</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 text-center">
          <a
            href={`${site.docsUrl}/methodology`}
            className="btn-secondary"
          >
            Read the methodology
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
