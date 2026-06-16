import Image from "next/image";
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
  const mark = (
    <span
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[26%] ring-1 ring-white/10"
      style={{ width: size, height: size }}
    >
      <Image
        src="/loreon-logo.jpg"
        alt="LoreonLabs logo"
        width={size}
        height={size}
        priority
        className="h-full w-full object-cover"
      />
    </span>
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
