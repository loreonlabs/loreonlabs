/**
 * LoreonLabs mark — an abstract "signal flow" glyph (no container, no frame).
 * A discovery path ascending through intelligence nodes to a bright signal,
 * reading as information networks / discovery. Minimal and geometric in the
 * spirit of Stripe / Linear / Vercel, but unique to Loreon. Aspect ~7:6.
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
  const width = Math.round((height * 28) / 24);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 24"
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <linearGradient
          id="loreon-flow"
          x1="3"
          y1="20"
          x2="25"
          y2="5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00B4D8" />
          <stop offset="1" stopColor="#4F8CFF" />
        </linearGradient>
      </defs>
      {/* discovery path */}
      <path
        d="M3.5 18.5 L11 13 L17.5 15 L24 5.5"
        stroke="url(#loreon-flow)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* intelligence nodes */}
      <circle cx="3.5" cy="18.5" r="2" fill="#0E7490" />
      <circle cx="11" cy="13" r="2" fill="#00B4D8" />
      <circle cx="17.5" cy="15" r="2" fill="#25C9FF" />
      {/* signal node — brightest */}
      <circle cx="24" cy="5.5" r="2.9" fill="#00D4FF" />
    </svg>
  );
}
