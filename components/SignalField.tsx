/**
 * SignalField — the shared Loreon background. Visibly animated "information
 * flow": large cyan/blue gradient washes that drift, horizontal signal streams
 * that sweep across, an intelligence sweep, and flowing research contours.
 * Pure CSS/SVG (transform + opacity), GPU-friendly, paused by
 * prefers-reduced-motion (handled globally in globals.css).
 *
 * `subtle` = the calmer variant behind dense app / docs surfaces.
 */
const streams = [
  { top: "16%", delay: "0s", h: "h-24", from: "from-accent/30" },
  { top: "42%", delay: "-6s", h: "h-20", from: "from-accent-blue/28" },
  { top: "68%", delay: "-11s", h: "h-28", from: "from-accent-soft/24" },
];

const contourRows = [60, 108, 156, 204, 252, 300, 348];

export function SignalField({ subtle = false }: { subtle?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${
        subtle ? "opacity-70" : ""
      }`}
    >
      {/* foundation */}
      {!subtle && <div className="absolute inset-0 bg-background" />}

      {/* large drifting gradient washes */}
      <div className="absolute -top-[22%] left-[2%] h-[68vh] w-[58vw] rounded-full bg-accent/[0.18] blur-[140px] animate-mesh-drift" />
      <div className="absolute top-[8%] -right-[14%] h-[64vh] w-[56vw] rounded-full bg-accent-blue/[0.18] blur-[150px] animate-mesh-drift-2" />
      <div className="absolute -bottom-[20%] left-[20%] h-[60vh] w-[54vw] rounded-full bg-accent-soft/[0.15] blur-[150px] animate-mesh-drift [animation-delay:-9s]" />

      {/* moving signal streams — visible horizontal flow */}
      {streams.map((s, i) => (
        <div
          key={i}
          className={`absolute left-0 w-[60vw] ${s.h} animate-stream rounded-full bg-gradient-to-r ${s.from} via-accent/10 to-transparent blur-2xl`}
          style={{ top: s.top, animationDelay: s.delay }}
        />
      ))}

      {/* intelligence sweep */}
      <div className="absolute -inset-x-1/4 inset-y-0 animate-signal-sweep bg-[linear-gradient(115deg,transparent_42%,rgba(0,212,255,0.1)_50%,transparent_58%)]" />

      {/* flowing research contours */}
      <svg
        className="absolute inset-x-0 top-[18%] h-[64%] w-full animate-wave"
        viewBox="0 0 1200 400"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="loreon-contour" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#00D4FF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#00D4FF" stopOpacity="0.65" />
            <stop offset="1" stopColor="#4F8CFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {contourRows.map((y, i) => (
          <path
            key={i}
            d={`M-40 ${y} C 320 ${y - 46}, 520 ${y + 40}, 820 ${y - 12} S 1240 ${y + 30}, 1240 ${y}`}
            stroke="url(#loreon-contour)"
            strokeWidth="1.2"
            opacity={0.55 - Math.abs(i - 3) * 0.05}
          />
        ))}
      </svg>

      {/* settle into the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
