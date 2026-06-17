import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional right-aligned actions (buttons, links). */
  actions?: ReactNode;
  /** Optional content rendered below the header (e.g. a stat row). */
  children?: ReactNode;
}

/**
 * Standard page header used across the product platform and documentation.
 * Provides consistent title / description / actions composition.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  children,
}: PageHeaderProps) {
  return (
    <header className="border-b border-border/60 pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          {eyebrow && (
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-ink">
                {eyebrow}
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-accent/60 to-transparent" />
            </div>
          )}
          <h1 className="t-page-title mt-2.5">{title}</h1>
          {description && <p className="t-body mt-3 text-pretty">{description}</p>}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>
      {children && <div className="mt-6">{children}</div>}
    </header>
  );
}
