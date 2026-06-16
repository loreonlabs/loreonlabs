import type { Trend } from "@/lib/types";
import { TrendUpIcon, TrendDownIcon } from "@/components/icons";

const styles: Record<Trend, string> = {
  up: "text-accent",
  down: "text-rose-400",
  flat: "text-muted",
};

interface TrendPillProps {
  trend: Trend;
  value?: string;
  className?: string;
}

/** Compact trend indicator with delta value. Reused by StatCard and cards. */
export function TrendPill({ trend, value, className = "" }: TrendPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-mono text-[11px] ${styles[trend]} ${className}`}
    >
      {trend === "up" && <TrendUpIcon width={12} height={12} />}
      {trend === "down" && <TrendDownIcon width={12} height={12} />}
      {trend === "flat" && <span aria-hidden>·</span>}
      {value}
    </span>
  );
}
