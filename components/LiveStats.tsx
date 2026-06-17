"use client";

import { useEffect, useState } from "react";

export type Stat = { label: string; value: number; suffix?: string };

function StatItem({ label, value, suffix }: Stat) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div className="flex flex-col">
      <span className="font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {display}
        {suffix}
      </span>
      <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
    </div>
  );
}

/** Animated count-up stats — real coverage figures, not decorative numbers. */
export function LiveStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-4 sm:gap-x-10 sm:gap-y-5">
      {stats.map((s) => (
        <StatItem key={s.label} {...s} />
      ))}
    </div>
  );
}
