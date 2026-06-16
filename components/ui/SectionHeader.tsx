import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

/**
 * Section-level heading used to separate content blocks within a page.
 * Smaller than PageHeader; no bottom border.
 */
export function SectionHeader({ title, description, actions }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="t-section-title">{title}</h2>
        {description && <p className="t-body mt-1">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
