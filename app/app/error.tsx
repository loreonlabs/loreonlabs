"use client";

/** Segment error boundary for /app. Recoverable without a full reload. */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-surface shadow-card p-10 text-center">
      <p className="text-sm font-medium text-foreground">Something went wrong</p>
      <p className="mx-auto mt-1.5 max-w-md text-[13px] text-muted">
        {error.message || "An unexpected error occurred while loading live data."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="btn-secondary mt-5 px-4 py-2 text-[13px]"
      >
        Try again
      </button>
    </div>
  );
}
