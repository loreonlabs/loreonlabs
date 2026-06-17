import { SectionHeading } from "../SectionHeading";
import { Stagger, StaggerItem } from "../Reveal";
import { RadarIcon, ShieldCheck, SparkIcon, PulseIcon } from "../icons";

const principles = [
  {
    icon: RadarIcon,
    title: "Signal over noise",
    body: "We weight corroboration over volume. One verified signal outranks a hundred mentions.",
  },
  {
    icon: PulseIcon,
    title: "Quality over volume",
    body: "Fewer, higher-confidence surfaces — calm and precise, never a firehose of alerts.",
  },
  {
    icon: ShieldCheck,
    title: "Verification first",
    body: "Every claim is traceable to a real, named source. Nothing is fabricated or inferred.",
  },
  {
    icon: SparkIcon,
    title: "Attention before consensus",
    body: "We surface what's accelerating early — while it still matters, before it's obvious.",
  },
];

export function IntelligencePrinciples() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-10 h-72 w-72 rounded-full bg-accent/[0.06] blur-[120px]"
      />
      <div className="container-page">
        <SectionHeading
          eyebrow="Principles"
          title="The standards behind every signal."
          description="Loreon is opinionated about what earns a place on the platform. These principles shape every score, rank, and surface."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={p.title}>
                <div className="discovery-card hairline-top group flex h-full flex-col p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-accent-ink transition-transform duration-300 ease-premium group-hover:scale-105">
                    <Icon width={18} height={18} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
