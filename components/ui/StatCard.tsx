import type { ReactNode } from "react";
import type { Metric } from "@/lib/types";
import { TrendPill } from "./TrendPill";

interface StatCardProps extends Metric {
  icon?: ReactNode;
}

/**
 * Compact metric card. Shows a label, a large value, an optional trend delta,
 * and optional context line. Used in header stat rows across the platform.
 */
export function StatCard({
  label,
  value,
  delta,
  trend,
  context,
  icon,
}: StatCardProps) {
  return (
    <div className="hairline-top rounded-xl border border-border/70 bg-surface p-4 shadow-card transition-colors duration-200 hover:border-accent/30">
      <div className="flex items-center justify-between">
        <span className="t-meta uppercase tracking-wide">{label}</span>
        {icon && <span className="text-accent-ink">{icon}</span>}
      </div>
      <div className="mt-3 flex items-end gap-2">
        <span className="font-mono text-2xl font-semibold tracking-tight text-foreground">
          {value}
        </span>
        {delta && trend && <TrendPill trend={trend} value={delta} className="mb-1" />}
      </div>
      {context && <p className="mt-1.5 text-[11px] leading-snug text-muted">{context}</p>}
    </div>
  );
}
