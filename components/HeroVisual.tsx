"use client";

import { motion } from "framer-motion";
import {
  PulseIcon,
  UserSignalIcon,
  CompassIcon,
  LayersIcon,
  RadarIcon,
} from "./icons";

/**
 * Abstract "intelligence core" hero visual — purely decorative marketing
 * artwork. No data, charts, rankings, or metrics: a glowing brand core with
 * animated orbital rings and labelled capability nodes orbiting around it.
 */

const nodes = [
  { label: "Narratives", icon: PulseIcon, className: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" },
  { label: "Founders", icon: UserSignalIcon, className: "right-0 top-1/3 translate-x-1/4" },
  { label: "Projects", icon: CompassIcon, className: "bottom-0 right-1/4 translate-y-1/2" },
  { label: "Ecosystems", icon: LayersIcon, className: "bottom-0 left-1/4 translate-y-1/2" },
  { label: "Signals", icon: RadarIcon, className: "left-0 top-1/3 -translate-x-1/4" },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* ambient glow */}
      <div className="absolute inset-0 -z-10 rounded-full bg-accent/10 blur-[120px]" />

      {/* concentric rings */}
      <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-border/70" />
      <div className="absolute inset-[14%] rounded-full border border-border/60" />
      <div className="absolute inset-[28%] rounded-full border border-border/50" />

      {/* connecting lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        {[
          [50, 4],
          [92, 33],
          [70, 96],
          [30, 96],
          [8, 33],
        ].map(([x, y], i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            stroke="url(#coreLine)"
            strokeWidth="0.4"
          />
        ))}
        <defs>
          <linearGradient id="coreLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* core */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center"
      >
        <div className="absolute inset-0 rounded-3xl bg-accent/20 blur-2xl animate-pulse-soft" />
        {/* Temporary neutral placeholder — same 96x96 size as the removed logo. */}
        <div
          aria-hidden
          className="relative h-24 w-24 rounded-3xl bg-white/5 ring-1 ring-white/10"
        />
      </motion.div>

      {/* orbiting capability nodes */}
      {nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
            className={`absolute ${node.className}`}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-3 py-1.5 shadow-card backdrop-blur-xl"
            >
              <span className="grid h-5 w-5 place-items-center rounded-md bg-accent/10 text-accent">
                <Icon width={12} height={12} />
              </span>
              <span className="whitespace-nowrap text-xs font-medium text-foreground">
                {node.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
