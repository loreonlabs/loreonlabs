/** Shown while any /app page streams its live data. No blank screens. */
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="border-b border-border/60 pb-6">
        <div className="h-3 w-24 rounded bg-surface" />
        <div className="mt-3 h-8 w-64 rounded bg-surface" />
        <div className="mt-3 h-4 w-96 max-w-full rounded bg-surface" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl border border-border/60 bg-surface" />
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 rounded-2xl border border-border/60 bg-surface shadow-card" />
        ))}
      </div>
    </div>
  );
}
