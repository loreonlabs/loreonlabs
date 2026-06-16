"use client";

import { motion } from "framer-motion";
import { Reveal } from "../Reveal";
import { UserSignalIcon } from "../icons";

const founders = [
  { name: "0xQuill", role: "Infrastructure · pre-seed", score: 96, initials: "QL", up: "+31" },
  { name: "mira.eth", role: "AI agents · stealth", score: 91, initials: "MR", up: "+24" },
  { name: "danwood", role: "DeFi · serial operator", score: 87, initials: "DW", up: "+19" },
  { name: "sol_kade", role: "Consumer · building", score: 82, initials: "SK", up: "+15" },
];

const points = [
  { x: 0, y: 70 },
  { x: 25, y: 55 },
  { x: 50, y: 58 },
  { x: 75, y: 34 },
  { x: 100, y: 18 },
];

export function FounderSignals() {
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`)
    .join(" ");

  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* copy */}
          <div>
            <Reveal>
              <span className="badge">
                <span className="text-accent">
                  <UserSignalIcon width={13} height={13} />
                </span>
                Founder Signals
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-gradient sm:text-4xl md:text-[2.6rem] md:leading-[1.12]">
                Identify the operators gaining attention.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Loreon surfaces founders and builders gaining traction across the
                ecosystem — by mapping reputation, shipping cadence, and the
                attention forming around their work.
              </p>
            </Reveal>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
              {[
                { k: "Builders tracked", v: "12.4K" },
                { k: "Daily signals", v: "3.1K" },
                { k: "Avg lead time", v: "11d" },
              ].map((s, i) => (
                <Reveal key={s.k} delay={0.15 + i * 0.05}>
                  <div className="rounded-xl border border-border/70 bg-surface/50 p-3">
                    <div className="font-mono text-lg font-semibold text-foreground">
                      {s.v}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted">{s.k}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* visual */}
          <Reveal delay={0.1}>
            <div className="panel hairline-top relative overflow-hidden p-5 shadow-card">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Rising founders
                </span>
                <span className="font-mono text-[11px] text-muted">last 30d</span>
              </div>

              {/* trend line */}
              <div className="relative mb-5 h-24 rounded-xl border border-border/60 bg-background/40 p-3">
                <svg viewBox="0 0 100 80" className="h-full w-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="fsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={path}
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeInOut" }}
                  />
                  <path d={`${path} L100 80 L0 80 Z`} fill="url(#fsFill)" />
                  {points.map((p) => (
                    <circle key={p.x} cx={p.x} cy={p.y} r="2" fill="#22D3EE" />
                  ))}
                </svg>
              </div>

              <div className="space-y-2">
                {founders.map((f, i) => (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-2.5"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 font-mono text-xs font-semibold text-accent">
                      {f.initials}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-medium text-foreground">
                        {f.name}
                      </div>
                      <div className="truncate text-[11px] text-muted">{f.role}</div>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                      <span className="font-mono text-[11px] text-accent">▲ {f.up}</span>
                      <div className="text-right">
                        <div className="font-mono text-sm font-semibold text-foreground">
                          {f.score}
                        </div>
                        <div className="text-[9px] uppercase tracking-wide text-muted">
                          signal
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
