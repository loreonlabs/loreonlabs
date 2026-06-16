"use client";

import { motion } from "framer-motion";
import { DashboardMockup } from "./DashboardMockup";
import { ArrowRight } from "./icons";
import { site } from "@/lib/site";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: 0.1 + i * 0.1, ease },
  }),
};

const coverage = ["Crypto", "AI", "Base", "Ethereum", "Solana", "DeFi", "Stablecoins", "Prediction Markets"];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 sm:pt-40 lg:pt-44">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
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
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="text-gradient">Discover what gains attention</span>{" "}
            <span className="text-gradient-accent">before consensus.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
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
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a href={site.appUrl} className="btn-primary w-full sm:w-auto">
              Open App
              <ArrowRight width={16} height={16} />
            </a>
            <a href={site.docsUrl} className="btn-secondary w-full sm:w-auto">
              Explore Docs
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-12"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted/70">
              Coverage across
            </p>
            <div className="mask-fade-x mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
              {coverage.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border/60 bg-surface/40 px-3 py-1 text-xs text-muted"
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="relative mx-auto mt-16 max-w-4xl sm:mt-20"
        >
          <DashboardMockup />
        </motion.div>
      </div>

      {/* fade dashboard into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
