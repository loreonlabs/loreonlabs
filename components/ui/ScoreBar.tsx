interface ScoreBarProps {
  /** 0–100 score. */
  score: number;
  label?: string;
  className?: string;
}

/** Static attention-score bar with numeric value. No animation by design. */
export function ScoreBar({ score, label = "attention", className = "" }: ScoreBarProps) {
  const clamped = Math.max(0, Math.min(100, score));
  return (
    <div className={className}>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-muted">{label}</span>
        <span className="font-mono text-[11px] font-semibold text-accent">{clamped}</span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-border/60"
        role="meter"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent/50 to-accent"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
