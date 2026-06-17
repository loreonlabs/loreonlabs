import Link from "next/link";
import { LogoMark } from "./LogoMark";

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
  // Boxless geometric mark sitting directly beside the wordmark.
  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark height={Math.round(size * 0.82)} className="shrink-0" />
      {withWordmark && (
        <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
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
