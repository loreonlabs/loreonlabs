import { Particles } from "./Particles";

/**
 * Global ambient backdrop: animated grid, floating particles, and soft cyan glows.
 * Fixed behind all content.
 */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base color */}
      <div className="absolute inset-0 bg-background" />

      {/* animated panning grid */}
      <div className="absolute inset-0 bg-grid animate-grid-pan opacity-60 mask-radial" />

      {/* particle field */}
      <div className="absolute inset-0">
        <Particles />
      </div>

      {/* soft cyan glow blobs */}
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px] animate-pulse-soft" />
      <div className="absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[460px] w-[520px] rounded-full bg-cyan-500/5 blur-[130px]" />

      {/* vignette for depth + bottom fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,rgba(7,10,14,0.55)_100%)]" />
    </div>
  );
}
