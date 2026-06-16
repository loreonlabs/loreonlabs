import { SectionHeading } from "../SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../Reveal";
import { RadarIcon, SparkIcon, NetworkIcon } from "../icons";

const pillars = [
  {
    icon: RadarIcon,
    title: "A discovery engine",
    body: "Continuously scans the open web, communities, developer activity, and markets to find what's emerging — not what's already obvious.",
  },
  {
    icon: SparkIcon,
    title: "An intelligence platform",
    body: "Turns scattered, noisy signals into structured, comparable intelligence across narratives, founders, projects, and ecosystems.",
  },
  {
    icon: NetworkIcon,
    title: "A signal aggregation system",
    body: "Corroborates signals across many independent sources so attention is measured, not guessed — with provenance you can trust.",
  },
];

export function PlatformOverview() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="The platform"
          title="One layer for everything gaining attention."
          description="LoreonLabs is a single intelligence surface for the signals that move markets — built to feel calm, precise, and enterprise-grade."
        />

        <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={p.title}>
                <div className="hairline-top h-full rounded-2xl border border-border/70 bg-surface/60 p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-border/70 bg-background/60 text-accent">
                    <Icon width={20} height={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

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
