import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

/**
 * Coverage section — a live intelligence coverage matrix. Every ecosystem is
 * tracked across four signal layers at once; cells show coverage depth and a
 * staggered "scan" pulse sweeps down the rows. New structure (data matrix),
 * not the old floating pills.
 */
const dimensions = ["Narratives", "Builders", "Markets", "News"];

// Coverage depth per ecosystem across the four layers (0–3 = breadth tracked).
const rows: { name: string; depth: number[] }[] = [
  { name: "Crypto", depth: [3, 2, 3, 2] },
  { name: "AI", depth: [3, 3, 2, 3] },
  { name: "Base", depth: [3, 3, 2, 2] },
  { name: "Ethereum", depth: [3, 2, 3, 2] },
  { name: "Solana", depth: [2, 2, 3, 2] },
  { name: "DeFi", depth: [2, 2, 3, 3] },
  { name: "Stablecoins", depth: [2, 1, 3, 2] },
];

function DepthBars({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[0, 1, 2].map((b) => (
        <span
          key={b}
          className={`h-1.5 flex-1 rounded-full ${
            b < level ? "bg-gradient-to-r from-accent to-accent-blue" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

export function CoverageMatrix() {
  return (
    <section className="relative py-12 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-[80%] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[130px]"
      />
      <div className="container-page">
        <SectionHeading
          eyebrow="Coverage"
          title="Multi-dimensional intelligence coverage."
          description="Every ecosystem is tracked across four signal layers at once — narratives, builders, markets, and news — so context is always one glance away."
        />

        <Reveal className="mt-12">
          <div className="research-surface overflow-hidden">
            {/* header row */}
            <div className="grid grid-cols-[1.3fr_repeat(4,1fr)] border-b border-border bg-background-secondary/60">
              <div className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                Ecosystem
              </div>
              {dimensions.map((d) => (
                <div
                  key={d}
                  className="px-2 py-3 text-center text-[11px] font-medium uppercase tracking-[0.1em] text-muted"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* rows */}
            {rows.map((r, ri) => (
              <div
                key={r.name}
                className="group grid grid-cols-[1.3fr_repeat(4,1fr)] items-center border-b border-border/60 transition-colors last:border-0 hover:bg-accent/[0.04]"
              >
                <div className="flex items-center gap-2.5 px-4 py-3.5">
                  <span
                    className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent"
                    style={{ animationDelay: `${ri * 0.28}s` }}
                  />
                  <span className="text-sm font-medium text-foreground">{r.name}</span>
                </div>
                {r.depth.map((lvl, ci) => (
                  <div key={ci} className="px-3 py-3.5">
                    <DepthBars level={lvl} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* summary metrics */}
          <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2 text-[13px] text-muted">
            <span>
              <b className="font-mono text-foreground">7</b> ecosystems
            </span>
            <span>
              <b className="font-mono text-foreground">4</b> signal layers
            </span>
            <span>
              <b className="font-mono text-foreground">28</b> coverage streams
            </span>
            <span className="ml-auto flex items-center gap-1.5 text-accent-ink">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              live coverage
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
