"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../Reveal";
import { PulseIcon } from "../icons";

const categories = [
  { name: "AI", value: 94, delta: "+18%" },
  { name: "Base", value: 81, delta: "+12%" },
  { name: "Ethereum", value: 69, delta: "+5%" },
  { name: "Stablecoins", value: 76, delta: "+9%" },
  { name: "DeFi", value: 58, delta: "+6%" },
  { name: "Prediction Markets", value: 88, delta: "+24%" },
];

function bars(seed: number) {
  // deterministic bar heights
  return Array.from({ length: 12 }, (_, i) =>
    35 + ((Math.sin(seed * 1.7 + i * 0.9) + 1) / 2) * 60
  );
}

export function NarrativePulse() {
  return (
    <section id="features" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Narrative Pulse"
          icon={<PulseIcon width={13} height={13} />}
          title="Track narratives before they become obvious."
          description="Loreon measures momentum across themes in real time — so you see what's accelerating while it's still early."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => {
            const heights = bars(idx + 1);
            return (
              <StaggerItem key={cat.name}>
                <div className="hairline-top group h-full rounded-2xl border border-border/70 bg-surface/60 p-5 transition-all duration-300 hover:border-accent/40 hover:bg-surface">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      {cat.name}
                    </span>
                    <span className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">
                      {cat.delta}
                    </span>
                  </div>

                  {/* mini bar chart */}
                  <div className="mt-5 flex h-16 items-end gap-1">
                    {heights.map((h, i) => (
                      <motion.span
                        key={i}
                        initial={{ height: 0, opacity: 0.3 }}
                        whileInView={{ height: `${h}%`, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.03,
                          ease: "easeOut",
                        }}
                        className={`flex-1 rounded-sm ${
                          i >= heights.length - 3
                            ? "bg-accent"
                            : "bg-border group-hover:bg-accent/40"
                        } transition-colors`}
                      />
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/60">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cat.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-accent/50 to-accent"
                      />
                    </div>
                    <span className="ml-3 font-mono text-[11px] text-muted">
                      {cat.value}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-center text-sm text-muted">
            Momentum scoring blends social velocity, developer activity, and
            on-chain attention into a single signal.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
