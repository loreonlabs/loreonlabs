import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  size?: number;
  withWordmark?: boolean;
  href?: string;
  className?: string;
};

export function Logo({
  size = 38,
  withWordmark = true,
  href = "/",
  className = "",
}: LogoProps) {
  // Official Loreon logo — the image asset only, sitting directly on the
  // background beside the wordmark. No box / container / shadow / border.
  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/loreon-logo.jpg"
        alt="LoreonLabs"
        width={size}
        height={size}
        priority
        className="shrink-0 object-contain transition-transform duration-300 ease-premium group-hover:scale-[1.06]"
        style={{ width: size, height: size }}
      />
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
