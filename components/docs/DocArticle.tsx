import type { ReactNode } from "react";
import Link from "next/link";
import { docsOrder } from "@/lib/navigation";
import { ArrowRight } from "@/components/icons";

interface DocArticleProps {
  /** Current route, used to derive prev/next links. */
  href: string;
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
}

/**
 * Shared documentation article frame: header, prose body, and prev/next
 * navigation derived from the ordered docs list. Keeps every doc page
 * structurally consistent (Stripe / Linear style).
 */
export function DocArticle({
  href,
  eyebrow = "Documentation",
  title,
  description,
  children,
}: DocArticleProps) {
  const index = docsOrder.findIndex((d) => d.href === href);
  const prev = index > 0 ? docsOrder[index - 1] : null;
  const next = index >= 0 && index < docsOrder.length - 1 ? docsOrder[index + 1] : null;

  return (
    <article className="mx-auto max-w-2xl">
      <header className="border-b border-border/60 pb-6">
        <p className="t-eyebrow">{eyebrow}</p>
        <h1 className="t-page-title mt-2">{title}</h1>
        <p className="t-body mt-3 text-pretty text-[15px]">{description}</p>
      </header>

      <div className="prose-docs">{children}</div>

      <nav className="mt-14 grid gap-3 border-t border-border/60 pt-6 sm:grid-cols-2">
        {prev ? (
          <Link
            href={prev.href}
            className="group rounded-xl border border-border/70 bg-surface/40 p-4 transition-colors hover:border-accent/40"
          >
            <span className="text-[11px] uppercase tracking-wide text-muted">Previous</span>
            <span className="mt-1 flex items-center gap-2 text-sm font-medium text-foreground">
              <ArrowRight width={14} height={14} className="rotate-180 text-accent" />
              {prev.label}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={next.href}
            className="group rounded-xl border border-border/70 bg-surface/40 p-4 text-right transition-colors hover:border-accent/40 sm:col-start-2"
          >
            <span className="text-[11px] uppercase tracking-wide text-muted">Next</span>
            <span className="mt-1 flex items-center justify-end gap-2 text-sm font-medium text-foreground">
              {next.label}
              <ArrowRight width={14} height={14} className="text-accent" />
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
