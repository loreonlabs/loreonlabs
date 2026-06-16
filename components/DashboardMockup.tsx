"use client";

import { motion } from "framer-motion";
import {
  PulseIcon,
  UserSignalIcon,
  CompassIcon,
  ChartIcon,
} from "./icons";

const narratives = [
  { label: "AI Agents", value: 92, trend: "+18%" },
  { label: "Base", value: 78, trend: "+11%" },
  { label: "Stablecoins", value: 64, trend: "+7%" },
  { label: "Prediction Mkts", value: 51, trend: "+22%" },
];

const founders = [
  { name: "0xQuill", role: "Infra · pre-seed", score: 96, initials: "QL" },
  { name: "mira.eth", role: "AI · stealth", score: 89, initials: "MR" },
  { name: "danwood", role: "DeFi · operator", score: 84, initials: "DW" },
];

const projects = [
  { name: "Helix Protocol", tag: "Base", momentum: 88 },
  { name: "Vantage AI", tag: "AI", momentum: 73 },
];

// deterministic sparkline path
const spark = "M0 28 L10 22 L20 25 L30 14 L40 18 L50 8 L60 12 L70 4";

function Panel({
  title,
  icon,
  children,
  className = "",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`hairline-top flex flex-col rounded-xl border border-border/70 bg-surface/80 p-3.5 ${className}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-accent/10 text-accent">
          {icon}
        </span>
        <span className="text-[12px] font-medium tracking-tight text-foreground">
          {title}
        </span>
        <span className="ml-auto inline-flex h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
      </div>
      {children}
    </div>
  );
}

export function DashboardMockup() {
  return (
    <div className="relative">
      {/* glow under the dashboard */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-accent/10 blur-3xl" />

      <div className="panel glow-accent overflow-hidden p-2.5 shadow-card sm:p-3">
        {/* window chrome */}
        <div className="flex items-center gap-2 px-2 pb-2.5 pt-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[#374151]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#374151]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#374151]" />
          <div className="ml-3 flex items-center gap-2 rounded-md border border-border/70 bg-background/60 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[10px] text-muted">
              loreon · intelligence
            </span>
          </div>
          <div className="ml-auto hidden items-center gap-1.5 sm:flex">
            <span className="rounded-md border border-border/70 bg-background/40 px-2 py-1 font-mono text-[10px] text-muted">
              Live
            </span>
          </div>
        </div>

        <div className="grid gap-2.5 rounded-xl bg-background/40 p-2.5 sm:grid-cols-2">
          {/* Narrative Pulse */}
          <Panel title="Narrative Pulse" icon={<PulseIcon width={14} height={14} />}>
            <div className="space-y-2.5">
              {narratives.map((n, i) => (
                <div key={n.label} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted">{n.label}</span>
                    <span className="font-mono text-accent">{n.trend}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-border/50">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${n.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Founder Signals */}
          <Panel title="Founder Signals" icon={<UserSignalIcon width={14} height={14} />}>
            <div className="space-y-2">
              {founders.map((f) => (
                <div
                  key={f.name}
                  className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-background/40 p-2"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-accent/15 font-mono text-[10px] font-semibold text-accent">
                    {f.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-[11px] font-medium text-foreground">
                      {f.name}
                    </div>
                    <div className="truncate text-[10px] text-muted">{f.role}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="font-mono text-[11px] font-semibold text-accent">
                      {f.score}
                    </div>
                    <div className="text-[9px] text-muted">signal</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Project Discovery */}
          <Panel title="Project Discovery" icon={<CompassIcon width={14} height={14} />}>
            <div className="space-y-2">
              {projects.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/40 p-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[11px] font-medium text-foreground">
                    {p.name}
                  </span>
                  <span className="rounded border border-border/60 px-1.5 py-0.5 font-mono text-[9px] text-muted">
                    {p.tag}
                  </span>
                  <span className="ml-auto font-mono text-[10px] text-accent">
                    ▲ {p.momentum}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg border border-dashed border-border/60 p-2 text-[10px] text-muted">
                <span>+ 14 emerging this week</span>
                <span className="font-mono text-accent">scan</span>
              </div>
            </div>
          </Panel>

          {/* Market Attention */}
          <Panel title="Market Attention" icon={<ChartIcon width={14} height={14} />}>
            <div className="flex h-full flex-col">
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-mono text-2xl font-semibold tracking-tight text-foreground">
                    74.2
                  </div>
                  <div className="text-[10px] text-muted">attention index</div>
                </div>
                <span className="rounded-md bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] text-accent">
                  +6.4%
                </span>
              </div>
              <svg
                viewBox="0 0 70 32"
                className="mt-3 h-12 w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={spark}
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
                <path
                  d={`${spark} L70 32 L0 32 Z`}
                  fill="url(#sparkFill)"
                  opacity="0.9"
                />
              </svg>
              <div className="mt-2 flex justify-between font-mono text-[9px] text-muted">
                <span>24h</span>
                <span>7d</span>
                <span>30d</span>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      {/* floating accent ticker */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute -bottom-5 left-6 hidden items-center gap-2 rounded-xl border border-border/80 bg-background/90 px-3 py-2 shadow-card backdrop-blur-xl sm:flex"
      >
        <span className="h-2 w-2 animate-pulse-soft rounded-full bg-accent" />
        <span className="font-mono text-[11px] text-muted">
          signal detected · <span className="text-accent">AI Agents</span> before consensus
        </span>
      </motion.div>
    </div>
  );
}
