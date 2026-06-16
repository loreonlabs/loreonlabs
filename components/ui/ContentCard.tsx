import type { ReactNode } from "react";
import Link from "next/link";

interface ContentCardProps {
  title: string;
  description?: string;
  /** Top-left adornment, e.g. an icon or avatar. */
  leading?: ReactNode;
  /** Top-right adornment, e.g. a score or trend. */
  trailing?: ReactNode;
  /** Tags / badges row above the footer. */
  tags?: ReactNode;
  /** Footer meta row. */
  footer?: ReactNode;
  /** If provided, the whole card becomes a link. */
  href?: string;
  className?: string;
}

/**
 * General-purpose content card used for narratives, founders, projects, and
 * discovery items. Optionally renders as a link when `href` is set.
 */
export function ContentCard({
  title,
  description,
  leading,
  trailing,
  tags,
  footer,
  href,
  className = "",
}: ContentCardProps) {
  const inner = (
    <div
      className={`hairline-top group flex h-full flex-col rounded-2xl border border-border/70 bg-surface/60 p-5 transition-colors duration-200 hover:border-accent/40 hover:bg-surface ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          {leading && <div className="shrink-0">{leading}</div>}
          <h3 className="t-card-title truncate">{title}</h3>
        </div>
        {trailing && <div className="shrink-0 text-right">{trailing}</div>}
      </div>

      {description && (
        <p className="t-body mt-2.5 line-clamp-3">{description}</p>
      )}

      {tags && <div className="mt-4 flex flex-wrap items-center gap-1.5">{tags}</div>}

      {footer && (
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/50 pt-3.5 text-[11px] text-muted">
          {footer}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}
