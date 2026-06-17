import Link from "next/link";

type LogoProps = {
  size?: number;
  withWordmark?: boolean;
  href?: string;
  className?: string;
};

export function Logo({
  size = 34,
  withWordmark = true,
  href = "/",
  className = "",
}: LogoProps) {
  // Temporary neutral placeholder — same size/ring/rounding as the logo mark,
  // so layout and spacing are unchanged while the Loreon logo is removed.
  const mark = (
    <span
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[26%] bg-white/5 ring-1 ring-white/10"
      style={{ width: size, height: size }}
      aria-hidden
    />
  );

  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {mark}
      {withWordmark && (
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          Loreon<span className="text-muted">Labs</span>
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label="LoreonLabs home" className="group">
        {content}
      </Link>
    );
  }
  return content;
}
