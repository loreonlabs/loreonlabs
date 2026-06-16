"use client";

import { motion } from "framer-motion";
import { Reveal } from "../Reveal";
import { CompassIcon } from "../icons";

const projects = [
  { name: "Helix Protocol", tag: "Base", stage: "Emerging", momentum: 88, days: "early" },
  { name: "Vantage AI", tag: "AI", stage: "Stealth", momentum: 81, days: "early" },
  { name: "Mesh Finance", tag: "DeFi", stage: "Building", momentum: 74, days: "watch" },
  { name: "Orbit Markets", tag: "Prediction", stage: "Emerging", momentum: 69, days: "watch" },
  { name: "Drift Labs", tag: "Solana", stage: "Scaling", momentum: 63, days: "track" },
];

const stages = ["Detected", "Verified", "Scored", "Surfaced"];

export function ProjectDiscovery() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* visual (left on desktop) */}
          <Reveal delay={0.1} className="order-2 lg:order-1">
            <div className="panel hairline-top relative overflow-hidden p-5 shadow-card">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Discovery feed
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
                  scanning
                </span>
              </div>

              {/* pipeline */}
              <div className="mb-4 flex items-center justify-between gap-1 rounded-xl border border-border/60 bg-background/40 p-2">
                {stages.map((s, i) => (
                  <div key={s} className="flex flex-1 items-center">
                    <div className="flex flex-1 flex-col items-center gap-1.5">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 260 }}
                        className="h-2 w-2 rounded-full bg-accent"
                      />
                      <span className="text-[9px] text-muted">{s}</span>
                    </div>
                    {i < stages.length - 1 && (
                      <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-border" />
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {projects.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                    className="group flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3 transition-colors hover:border-accent/40"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-border/60 bg-surface text-accent">
                      <CompassIcon width={15} height={15} />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-medium text-foreground">
                        {p.name}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded border border-border/60 px-1.5 py-0.5 font-mono text-[9px] text-muted">
                          {p.tag}
                        </span>
                        <span className="text-[10px] text-muted">{p.stage}</span>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                      <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-border/60 sm:block">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${p.momentum}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.3 + i * 0.08 }}
                          className="h-full rounded-full bg-accent"
                        />
                      </div>
                      <span className="font-mono text-[11px] text-accent">
                        {p.momentum}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* copy (right on desktop) */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="badge">
                <span className="text-accent">
                  <CompassIcon width={13} height={13} />
                </span>
                Project Discovery
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-gradient sm:text-4xl md:text-[2.6rem] md:leading-[1.12]">
                Find emerging projects before the mainstream.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Loreon continuously scans sources for new and emerging projects,
                scoring them on momentum and credibility — so you reach them before
                they reach broad visibility.
              </p>
            </Reveal>

            <ul className="mt-8 space-y-3">
              {[
                "Detect new projects the moment they surface",
                "Filter noise with credibility and momentum scoring",
                "Track from first signal to mainstream adoption",
              ].map((item, i) => (
                <Reveal key={item} delay={0.15 + i * 0.05}>
                  <li className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
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
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
