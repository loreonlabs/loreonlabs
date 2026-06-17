import Link from "next/link";
import { ArrowRight } from "@/components/icons";

interface BackLinkProps {
  href: string;
  label: string;
}

/** Small "back to section" link used at the top of detail pages. */
export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
    >
      <ArrowRight width={14} height={14} className="rotate-180 text-accent-ink" />
      {label}
    </Link>
  );
}
