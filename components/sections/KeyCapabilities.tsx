import { SectionHeading } from "../SectionHeading";
import { Stagger, StaggerItem } from "../Reveal";
import {
  PulseIcon,
  UserSignalIcon,
  CompassIcon,
  LayersIcon,
  ChartIcon,
  SearchIcon,
} from "../icons";

const capabilities = [
  {
    icon: PulseIcon,
    title: "Narrative Pulse",
    body: "Track emerging themes across crypto, AI, and technology before they become obvious.",
  },
  {
    icon: UserSignalIcon,
    title: "Founder Signals",
    body: "Identify the founders and operators gaining attention across the ecosystem.",
  },
  {
    icon: CompassIcon,
    title: "Project Discovery",
    body: "Find emerging projects early — filtered for credibility, surfaced before the mainstream.",
  },
  {
    icon: LayersIcon,
    title: "Ecosystem Intelligence",
    body: "Compare what's happening across Base, Ethereum, Solana, AI, and DeFi in one place.",
  },
  {
    icon: ChartIcon,
    title: "Market Attention",
    body: "Understand where attention is concentrating across sectors and themes.",
  },
  {
    icon: SearchIcon,
    title: "Unified Search",
    body: "One query across narratives, founders, projects, and ecosystems.",
  },
];

export function KeyCapabilities() {
  return (
    <section id="features" className="relative scroll-mt-24 border-y border-border/60 bg-background-secondary/80 py-12 backdrop-blur-sm sm:py-24 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Key capabilities"
          title="Everything you need to stay ahead of attention."
          description="Six intelligence surfaces, unified into one premium platform."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <StaggerItem key={c.title}>
                <div className="hairline-top group h-full rounded-2xl border border-border/70 bg-surface p-6 transition-colors duration-300 hover:border-accent/40 hover:bg-surface">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-border/70 bg-background/60 text-accent-ink transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon width={20} height={20} />
                  </span>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
