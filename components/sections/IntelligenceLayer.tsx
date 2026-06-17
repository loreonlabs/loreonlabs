import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

/**
 * Architecture section — one unified intelligence layer. Signals flow UP the
 * stack: raw sources → validation/correlation → scoring → narrative surface,
 * with an animated cyan flow routing attention upward. New structure (layered
 * stack), replacing the old floating category pills.
 */
const layers = [
  {
    tag: "Surface",
    title: "Narrative surface",
    note: "Ranked output across every ecosystem",
    items: ["Crypto", "AI", "Base", "Ethereum", "Solana", "DeFi", "Stablecoins"],
    accent: true,
  },
  {
    tag: "Score",
    title: "Attention scoring",
    note: "Momentum-weighted, early-mover biased",
    items: ["Momentum", "Acceleration", "Confidence", "Provenance"],
  },
  {
    tag: "Process",
    title: "Validation & correlation",
    note: "Corroborated, clustered, de-duplicated",
    items: ["Corroborate", "Cluster", "Normalize", "De-dupe"],
  },
  {
    tag: "Ingest",
    title: "Source layer",
    note: "Continuous multi-source ingestion",
    items: ["RSS", "Hacker News", "GitHub", "CoinGecko", "Tavily"],
  },
];

export function IntelligenceLayer() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] top-20 h-80 w-80 rounded-full bg-accent-blue/[0.07] blur-[130px]"
      />
      <div className="container-page">
        <SectionHeading
          eyebrow="Architecture"
          title="One unified intelligence layer."
          description="Signals flow up the stack — from raw sources, through validation and scoring, into ranked narratives across every ecosystem."
        />

        <Reveal className="relative mt-12">
          {/* animated upward attention flow (left rail) */}
          <div className="pointer-events-none absolute bottom-6 left-[1.85rem] top-6 hidden w-px sm:block">
            <div className="absolute inset-0 bg-border" />
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 2 100">
              <line
                x1="1"
                y1="100"
                x2="1"
                y2="0"
                stroke="#00D4FF"
                strokeWidth="2"
                strokeDasharray="8 8"
                className="animate-flow-dash"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className="absolute -left-[3px] top-0 h-2 w-2 rounded-full bg-accent shadow-glow" />
          </div>

          <div className="space-y-3">
            {layers.map((l) => (
              <div
                key={l.title}
                className="research-surface group relative flex flex-col gap-3 p-5 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-elevate sm:flex-row sm:items-center sm:pl-14"
              >
                <span
                  className={`absolute left-[1.4rem] top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full sm:block ${
                    l.accent ? "bg-accent shadow-glow" : "bg-accent/60"
                  }`}
                />
                <div className="sm:w-52 sm:shrink-0">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-accent-ink">
                    {l.tag}
                  </span>
                  <h3 className="mt-0.5 font-display text-[15px] font-semibold tracking-tight text-foreground">
                    {l.title}
                  </h3>
                  <p className="mt-0.5 text-[12px] text-muted">{l.note}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {l.items.map((it) => (
                    <span
                      key={it}
                      className={`rounded-lg border px-2.5 py-1 text-[12px] font-medium transition-colors ${
                        l.accent
                          ? "border-accent/30 bg-accent/10 text-accent-ink"
                          : "border-border bg-background-secondary text-body"
                      }`}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
