import type { ReactNode } from "react";

type BadgeTone = "default" | "accent" | "muted";

const tones: Record<BadgeTone, string> = {
  default: "border-border/70 bg-surface/60 text-muted",
  accent: "border-accent/30 bg-accent/10 text-accent",
  muted: "border-border/60 bg-background/40 text-muted",
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

/** Small pill label, reused for tags, tiers, stages, and source chips. */
export function Badge({ children, tone = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
