"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../SectionHeading";
import {
  GlobeIcon,
  ForumIcon,
  GitIcon,
  ChartIcon,
  SparkIcon,
  BoltIcon,
} from "../icons";

const sources = [
  { name: "Web Sources", icon: GlobeIcon, desc: "News, blogs, docs" },
  { name: "Reddit", icon: ForumIcon, desc: "Community discussion" },
  { name: "GitHub", icon: GitIcon, desc: "Developer activity" },
  { name: "CoinGecko", icon: ChartIcon, desc: "Market data" },
];

export function HowItWorks() {
  return (
    <section id="methodology" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Methodology"
          icon={<SparkIcon width={13} height={13} />}
          title="How Loreon works."
          description="Loreon ingests signals from across the open web, normalizes them, and turns raw noise into actionable intelligence."
        />

        <div className="mx-auto mt-16 max-w-5xl">
          {/* Sources -> Engine -> Output flow */}
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {/* Sources column */}
            <div className="space-y-3">
              {sources.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="hairline-top flex items-center gap-3 rounded-xl border border-border/70 bg-surface/60 p-3"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border/60 bg-background/60 text-accent">
                    <s.icon width={16} height={16} />
                  </span>
                  <div>
                    <div className="text-[13px] font-medium text-foreground">
                      {s.name}
                    </div>
                    <div className="text-[11px] text-muted">{s.desc}</div>
                  </div>
                  <span className="ml-auto h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
                </motion.div>
              ))}
            </div>

            {/* connector 1 */}
            <Connector />

            {/* Engine */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto"
            >
              <div className="absolute -inset-5 -z-10 rounded-full bg-accent/15 blur-2xl animate-pulse-soft" />
              <div className="panel glow-accent flex aspect-square w-44 flex-col items-center justify-center gap-2 rounded-3xl p-4 text-center sm:w-52">
                <span className="relative grid h-14 w-14 place-items-center">
                  <span className="absolute inset-0 rounded-full border border-accent/30 animate-spin-slow" />
                  <span className="absolute inset-2 rounded-full border border-accent/20" />
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-accent">
                    <SparkIcon width={20} height={20} />
                  </span>
                </span>
                <div className="mt-1 text-sm font-semibold text-foreground">
                  Loreon Engine
                </div>
                <div className="text-[11px] leading-snug text-muted">
                  Normalize · correlate · score
                </div>
              </div>
            </motion.div>

            {/* connector 2 */}
            <Connector />

            {/* Output */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hairline-top rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/12 to-transparent p-5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                <BoltIcon width={18} height={18} />
              </span>
              <div className="mt-3 text-base font-semibold text-foreground">
                Actionable Intelligence
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                Ranked narratives, founders, and projects — delivered before
                consensus forms.
              </p>
              <div className="mt-4 space-y-1.5">
                {["Narrative Pulse", "Founder Signals", "Project Discovery"].map(
                  (o, i) => (
                    <motion.div
                      key={o}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-2 text-[11px] text-muted"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {o}
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </div>

          {/* mobile vertical flow labels */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center font-mono text-[11px] text-muted lg:hidden">
            {["Web", "Reddit", "GitHub", "CoinGecko", "Engine", "Intelligence"].map(
              (s, i, arr) => (
                <span key={s} className="inline-flex items-center gap-2">
                  <span className={i === arr.length - 1 ? "text-accent" : ""}>
                    {s}
                  </span>
                  {i < arr.length - 1 && <span className="text-accent/50">→</span>}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Connector() {
  return (
    <div className="hidden items-center lg:flex" aria-hidden="true">
      <div className="relative h-px w-16 overflow-hidden bg-border">
        <motion.span
          className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-transparent via-accent to-transparent"
          animate={{ x: ["-2rem", "4rem"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <svg width="10" height="10" viewBox="0 0 10 10" className="-ml-1 text-accent">
        <path
          d="m3 2 4 3-4 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
