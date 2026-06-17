/**
 * SignalField — the shared ambient background across all three zones.
 * "Attention signals moving beneath a research surface": slow blurred
 * cyan/blue mesh drift, a faint intelligence sweep, and gentle narrative
 * contour lines. Pure CSS/SVG (transform + opacity only) so it's cheap and
 * fully paused by `prefers-reduced-motion` (handled globally in globals.css).
 *
 * `subtle` = the calmer variant used behind dense app / docs surfaces.
 */
export function SignalField({ subtle = false }: { subtle?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${
        subtle ? "opacity-[0.55]" : ""
      }`}
    >
      {!subtle && <div className="absolute inset-0 bg-background" />}

      {/* attention-field mesh — slow blurred drift */}
      <div className="absolute -top-[22%] left-[4%] h-[62vh] w-[55vw] rounded-full bg-accent/10 blur-[150px] animate-mesh-drift" />
      <div className="absolute top-[12%] -right-[12%] h-[58vh] w-[52vw] rounded-full bg-accent-blue/10 blur-[160px] animate-mesh-drift-2" />
      <div className="absolute -bottom-[18%] left-[22%] h-[55vh] w-[50vw] rounded-full bg-accent-soft/10 blur-[160px] animate-mesh-drift [animation-delay:-9s]" />

      {/* intelligence sweep — a faint diagonal light gliding across */}
      <div className="absolute -inset-x-1/4 inset-y-0 animate-signal-sweep bg-[linear-gradient(115deg,transparent_42%,rgba(0,212,255,0.06)_50%,transparent_58%)]" />

      {/* narrative contours — faint flowing signal lines */}
      <svg
        className="absolute inset-x-0 top-[22%] h-[56%] w-full animate-wave"
        viewBox="0 0 1200 400"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="loreon-contour" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#00D4FF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#00D4FF" stopOpacity="0.55" />
            <stop offset="1" stopColor="#4F8CFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 38, 76, 116, 158].map((o, i) => (
          <path
            key={i}
            d={`M0 ${118 + o} C 320 ${56 + o}, 520 ${206 + o}, 820 ${122 + o} S 1200 ${94 + o}, 1200 ${140 + o}`}
            stroke="url(#loreon-contour)"
            strokeWidth="1"
            opacity={0.5 - i * 0.07}
          />
        ))}
      </svg>

      {/* settle the field into the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
