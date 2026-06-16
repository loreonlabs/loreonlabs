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
          {eyebrow && <p className="t-eyebrow">{eyebrow}</p>}
          <h1 className="t-page-title mt-2">{title}</h1>
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
