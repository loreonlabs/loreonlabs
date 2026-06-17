/**
 * LoreonLabs mark — "signals converge → intelligence emerges."
 * Three signal paths spiral inward from 120°-symmetry and resolve into a
 * single bright insight point. No container, no text, no chart motifs —
 * geometric, minimal, and built to read from favicon up to social avatar.
 */
export function LogoMark({
  height = 24,
  className = "",
  title = "LoreonLabs",
}: {
  height?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={height}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <linearGradient
          id="loreon-sig"
          x1="5"
          y1="5"
          x2="27"
          y2="27"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#25C9FF" />
          <stop offset="1" stopColor="#4F8CFF" />
        </linearGradient>
        <radialGradient id="loreon-core" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#25C9FF" />
          <stop offset="1" stopColor="#00B4D8" />
        </radialGradient>
      </defs>
      {/* three converging signal paths (120° rotational symmetry) */}
      <g
        stroke="url(#loreon-sig)"
        strokeWidth="2.1"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M16 3.4 C 12.4 7.6, 12.9 12.2, 15.7 14.2" />
        <path
          d="M16 3.4 C 12.4 7.6, 12.9 12.2, 15.7 14.2"
          transform="rotate(120 16 16)"
        />
        <path
          d="M16 3.4 C 12.4 7.6, 12.9 12.2, 15.7 14.2"
          transform="rotate(240 16 16)"
        />
      </g>
      {/* insight point */}
      <circle cx="16" cy="16" r="2.7" fill="url(#loreon-core)" />
    </svg>
  );
}
