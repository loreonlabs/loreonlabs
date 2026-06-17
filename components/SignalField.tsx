/**
 * SignalField — the shared Loreon background system across all three zones.
 * Layered, alive, but calm:
 *   L1 off-white foundation · L2 soft cyan/blue gradient washes ·
 *   L3 flowing intelligence contours · L4 drifting attention field +
 *   intelligence sweep.
 * Pure CSS/SVG (transform + opacity only) — cheap, GPU-friendly, and fully
 * paused by prefers-reduced-motion (handled globally in globals.css).
 *
 * `subtle` = the calmer variant behind dense app / docs surfaces.
 */
const contourRows = [60, 108, 156, 204, 252, 300, 348];

export function SignalField({ subtle = false }: { subtle?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${
        subtle ? "opacity-[0.65]" : ""
      }`}
    >
      {/* L1 — foundation */}
      {!subtle && <div className="absolute inset-0 bg-background" />}

      {/* L2 — soft cyan / blue gradient washes, slow drift */}
      <div className="absolute -top-[22%] left-[2%] h-[68vh] w-[58vw] rounded-full bg-accent/[0.16] blur-[150px] animate-mesh-drift" />
      <div className="absolute top-[8%] -right-[14%] h-[64vh] w-[56vw] rounded-full bg-accent-blue/[0.16] blur-[160px] animate-mesh-drift-2" />
      <div className="absolute -bottom-[20%] left-[20%] h-[60vh] w-[54vw] rounded-full bg-accent-soft/[0.13] blur-[160px] animate-mesh-drift [animation-delay:-9s]" />

      {/* L4 — intelligence sweep: a soft diagonal current gliding across */}
      <div className="absolute -inset-x-1/4 inset-y-0 animate-signal-sweep bg-[linear-gradient(115deg,transparent_40%,rgba(0,212,255,0.09)_50%,transparent_60%)]" />

      {/* L3 — flowing intelligence contours */}
      <svg
        className="absolute inset-x-0 top-[18%] h-[64%] w-full animate-wave"
        viewBox="0 0 1200 400"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="loreon-contour" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#00D4FF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#00D4FF" stopOpacity="0.6" />
            <stop offset="1" stopColor="#4F8CFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {contourRows.map((y, i) => (
          <path
            key={i}
            d={`M-40 ${y} C 320 ${y - 46}, 520 ${y + 40}, 820 ${y - 12} S 1240 ${y + 30}, 1240 ${y}`}
            stroke="url(#loreon-contour)"
            strokeWidth="1"
            opacity={0.5 - Math.abs(i - 3) * 0.05}
          />
        ))}
      </svg>

      {/* settle the field into the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
