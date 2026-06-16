"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../SectionHeading";
import { Stagger, StaggerItem } from "../Reveal";
import { LayersIcon } from "../icons";

const ecosystems = [
  {
    name: "Base",
    blurb: "Onchain consumer apps and infra gaining velocity.",
    narratives: 142,
    heat: 91,
    glyph: "B",
  },
  {
    name: "Ethereum",
    blurb: "Core protocol, L2s, and restaking activity.",
    narratives: 318,
    heat: 76,
    glyph: "Ξ",
  },
  {
    name: "Solana",
    blurb: "High-throughput apps and consumer momentum.",
    narratives: 205,
    heat: 83,
    glyph: "S",
  },
  {
    name: "AI",
    blurb: "Agents, models, and AI-native infrastructure.",
    narratives: 264,
    heat: 95,
    glyph: "AI",
  },
  {
    name: "DeFi",
    blurb: "Liquidity, lending, and structured products.",
    narratives: 176,
    heat: 68,
    glyph: "D",
  },
];

export function EcosystemIntelligence() {
  return (
    <section className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Ecosystem Intelligence"
          icon={<LayersIcon width={13} height={13} />}
          title="A live read on every ecosystem that matters."
          description="Compare attention, narratives, and emerging activity across ecosystems from a single intelligence layer."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ecosystems.map((eco) => (
            <StaggerItem key={eco.name}>
              <div className="hairline-top group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-surface/60 p-5 transition-all duration-300 hover:border-accent/40 hover:bg-surface">
                {/* hover glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/10" />

                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-border/70 bg-background/60 font-mono text-sm font-semibold text-accent">
                    {eco.glyph}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted">
                    <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
                    live
                  </div>
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                  {eco.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {eco.blurb}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                  <div>
                    <div className="font-mono text-sm font-semibold text-foreground">
                      {eco.narratives}
                    </div>
                    <div className="text-[11px] text-muted">active narratives</div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 flex items-center justify-end gap-2">
                      <span className="text-[11px] text-muted">heat</span>
                      <span className="font-mono text-sm font-semibold text-accent">
                        {eco.heat}
                      </span>
                    </div>
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-border/60">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${eco.heat}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-accent/50 to-accent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}

          {/* summary tile */}
          <StaggerItem>
            <div className="hairline-top flex h-full flex-col justify-between rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-5">
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  One intelligence layer
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  Every ecosystem, normalized into a single comparable signal —
                  updated continuously.
                </p>
              </div>
              <div className="mt-6 flex items-end gap-1">
                {[40, 65, 50, 80, 60, 92, 70, 100].map((h, i) => (
                  <motion.span
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h * 0.5}px` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="w-full rounded-sm bg-accent/70"
                  />
                ))}
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
