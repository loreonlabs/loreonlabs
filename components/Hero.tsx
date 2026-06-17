"use client";

import { motion } from "framer-motion";
import { HeroVisual } from "./HeroVisual";
import { LiveStats, type Stat } from "./LiveStats";
import { ArrowRight } from "./icons";
import { site } from "@/lib/site";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.3, delay: 0.06 + i * 0.06, ease },
  }),
};

const coverage = ["Crypto", "AI", "Base", "Ethereum", "Solana", "DeFi", "Stablecoins"];

export function Hero({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative overflow-hidden pt-36 sm:pt-40 lg:pt-44">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-10">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <span className="badge">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Intelligence &amp; discovery platform
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-7 text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.5rem]"
            >
              <span className="text-gradient">Discover what gains attention</span>{" "}
              <span className="text-gradient-accent">before consensus.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-body sm:text-xl lg:mx-0"
            >
              LoreonLabs tracks emerging narratives, founders, projects, and market
              signals across crypto, AI, and technology — surfacing what matters
              before it becomes obvious.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <a href={site.appUrl} className="btn-primary w-full sm:w-auto">
                Open App
                <ArrowRight width={16} height={16} />
              </a>
              <a href={site.docsUrl} className="btn-secondary w-full sm:w-auto">
                Read Docs
              </a>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-11 flex justify-center lg:justify-start"
            >
              <LiveStats stats={stats} />
            </motion.div>

            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-10"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted/70">
                Coverage across
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 lg:justify-start">
                {coverage.map((c) => (
                  <span
                    key={c}
                    className="chip-interactive rounded-full border border-border/60 bg-surface px-3 py-1 text-xs text-muted shadow-card"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Intelligence visual — weighted to the right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.12, ease }}
            className="relative lg:-mr-6 xl:-mr-12"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
