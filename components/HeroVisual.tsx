"use client";

import { motion } from "framer-motion";
import { TrendUpIcon, PulseIcon } from "./icons";

/**
 * Hero visual — an "intelligence canvas" that reads as Loreon's product:
 * a relationship graph of narratives / markets / builders / ecosystems
 * converging on a live signal, an attention-flow curve, and floating signal
 * cards. No brand mark inside — it represents the work, not the logo.
 * Calm motion only (gentle float + a soft pulse).
 */

type Node = { id: string; x: number; y: number; label: string; hub?: boolean };

const nodes: Node[] = [
  { id: "signal", x: 50, y: 50, label: "Signal", hub: true },
  { id: "narrative", x: 15, y: 15, label: "Narrative" },
  { id: "market", x: 84, y: 19, label: "Market" },
  { id: "builder", x: 78, y: 82, label: "Builder" },
  { id: "ecosystem", x: 13, y: 84, label: "Ecosystem" },
];

const dots = [
  { x: 50, y: 7 },
  { x: 93, y: 51 },
  { x: 7, y: 46 },
];

// [x1, y1, x2, y2, active]
const edges: [number, number, number, number, boolean][] = [
  [50, 50, 15, 15, true],
  [50, 50, 84, 19, true],
  [50, 50, 78, 82, true],
  [50, 50, 13, 84, true],
  [15, 15, 84, 19, false],
  [78, 82, 13, 84, false],
  [15, 15, 7, 46, false],
  [84, 19, 93, 51, false],
  [50, 50, 50, 7, false],
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:max-w-[620px]">
      {/* soft mesh glow behind the canvas */}
      <div className="absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-br from-accent/20 via-accent-blue/10 to-transparent blur-[80px] animate-mesh-drift" />

      {/* main intelligence canvas */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative overflow-hidden rounded-3xl border border-border bg-white/90 p-5 shadow-elevate backdrop-blur-sm sm:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" />

        {/* header */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Signal map
            </span>
          </div>
          <span className="rounded-md border border-accent/30 bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-accent-ink">
            Live
          </span>
        </div>

        {/* relationship graph */}
        <div className="relative mt-4 h-[228px] w-full sm:h-[248px]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {edges.map(([x1, y1, x2, y2, active], i) => (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={active ? "url(#edge)" : "#D9E1EC"}
                strokeWidth={active ? 0.7 : 0.5}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {dots.map((d, i) => (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300"
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
            />
          ))}

          {nodes.map((n) => (
            <div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              {n.hub ? (
                <span className="relative flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 shadow-glow-sm">
                  <span className="absolute -inset-1 -z-10 rounded-full bg-accent/15 blur-md animate-pulse-soft" />
                  <PulseIcon width={13} height={13} className="text-accent-ink" />
                  <span className="font-mono text-[11px] font-semibold text-accent-ink">
                    {n.label}
                  </span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-white px-2.5 py-1 shadow-card">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[11px] font-medium text-foreground">
                    {n.label}
                  </span>
                </span>
              )}
            </div>
          ))}
        </div>

        {/* attention flow */}
        <div className="relative mt-3 border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Attention flow
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] font-semibold text-success-ink">
              <TrendUpIcon width={12} height={12} />
              +34% 7d
            </span>
          </div>
          <svg
            className="mt-2 h-12 w-full"
            viewBox="0 0 300 50"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="att" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 40 L33 37 L66 39 L99 30 L132 33 L165 22 L198 25 L231 15 L264 18 L300 5 L300 50 L0 50 Z"
              fill="url(#att)"
            />
            <path
              d="M0 40 L33 37 L66 39 L99 30 L132 33 L165 22 L198 25 L231 15 L264 18 L300 5"
              stroke="#00B4D8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </motion.div>

      {/* floating signal card — attention spike (top-left, lifted out) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.18 }}
        className="absolute -left-5 top-10 hidden rotate-[-3deg] sm:block"
      >
        <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-white px-3.5 py-2.5 shadow-elevate">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-success/10 text-success-ink">
            <TrendUpIcon width={16} height={16} />
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
              Attention
            </p>
            <p className="font-mono text-sm font-semibold text-foreground">+218%</p>
          </div>
        </div>
      </motion.div>

      {/* floating signal card — narrative discovery (bottom-right, lifted out) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.26 }}
        className="absolute -bottom-6 right-2 hidden rotate-[3deg] sm:block"
      >
        <div className="rounded-2xl border border-border bg-white px-3.5 py-2.5 shadow-elevate">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="text-[11px] font-medium text-foreground">
              Narrative accelerating
            </p>
          </div>
          <div className="mt-1.5 flex items-end gap-0.5">
            {[5, 8, 6, 10, 9, 13, 16].map((h, i) => (
              <span
                key={i}
                className="w-1.5 rounded-sm bg-accent/70"
                style={{ height: h }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
