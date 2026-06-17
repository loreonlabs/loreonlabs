/**
 * Hero "Attention Field" — a living research surface, not a diagram.
 * Layered signal contours (research topography), a slow radar sweep, attention
 * waves and a focal insight point where signals resolve. Pure CSS/SVG motion
 * (transform + opacity), 8–24s loops, paused by prefers-reduced-motion.
 * No nodes, charts, cards, particles, or logos.
 */

const contourY = [64, 112, 160, 208, 256, 304, 352];
const waves = [
  { d: "M-40 196 C 110 150, 250 250, 460 188", stroke: "#00D4FF", opacity: 0.4 },
  { d: "M-40 232 C 120 286, 250 178, 460 244", stroke: "#25C9FF", opacity: 0.3 },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] lg:max-w-[640px]">
      {/* ambient intelligence glow */}
      <div className="absolute -inset-6 -z-10 rounded-[44px] bg-gradient-to-br from-accent/20 via-accent-blue/12 to-transparent blur-[80px] animate-mesh-drift" />

      {/* research surface */}
      <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] border border-border bg-white/70 shadow-elevate backdrop-blur-sm">
        {/* intelligence wash + structural grid */}
        <div className="intelligence-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-grid opacity-50 mask-radial" />

        {/* radar sweep */}
        <div
          className="absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(0,212,255,0.13) 36deg, rgba(79,140,255,0.05) 70deg, transparent 96deg)",
          }}
        />

        {/* concentric radar rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[0.42, 0.66, 0.9].map((s, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15"
              style={{ width: `${s * 100}%`, height: `${s * 100}%`, left: 0, top: 0 }}
            />
          ))}
        </div>

        {/* topographic signal contours */}
        <svg
          className="absolute inset-0 h-full w-full animate-wave"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hv-contour" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#00D4FF" stopOpacity="0" />
              <stop offset="0.5" stopColor="#00D4FF" stopOpacity="0.4" />
              <stop offset="1" stopColor="#4F8CFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {contourY.map((y, i) => (
            <path
              key={i}
              d={`M-40 ${y} C 90 ${y - 34}, 210 ${y + 30}, 330 ${y - 8} S 470 ${y + 22}, 440 ${y}`}
              stroke="url(#hv-contour)"
              strokeWidth="1"
              opacity={0.55 - Math.abs(i - 3) * 0.06}
            />
          ))}
        </svg>

        {/* attention waves */}
        <svg
          className="absolute inset-0 h-full w-full animate-wave [animation-delay:-7s]"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
        >
          {waves.map((w, i) => (
            <path
              key={i}
              d={w.d}
              stroke={w.stroke}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={w.opacity}
            />
          ))}
        </svg>

        {/* focal insight — where signals resolve */}
        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-2xl animate-pulse-soft" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-glow" />

        {/* top sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/20" />
      </div>
    </div>
  );
}
