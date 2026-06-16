import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";
import { integrations } from "@/lib/integrations";

export const metadata: Metadata = { title: "Data Sources" };

export default function DataSourcesPage() {
  return (
    <DocArticle
      href="/data-sources"
      title="Data sources"
      description="LoreonLabs draws on a diverse set of providers so that no single source dominates the signal. These integrations are planned for the data pipeline."
    >
      <h2 id="planned-sources">Planned sources</h2>
      <p>
        Each provider contributes a distinct kind of signal. Together they give
        Loreon a corroborated, multi-perspective view of where attention is
        forming.
      </p>

      <div className="mt-6 space-y-3">
        {integrations.map((i) => (
          <div
            key={i.key}
            className="rounded-xl border border-border/70 bg-surface/50 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-foreground">{i.name}</span>
              <span className="rounded-md border border-border/70 bg-background/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
                {i.status}
              </span>
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
              {i.description} {i.contributes}
            </p>
          </div>
        ))}
      </div>

      <h2 id="provenance">Provenance</h2>
      <p>
        Every surfaced item records which sources contributed to it. This keeps the
        platform auditable — you can always see why something appeared and weigh it
        accordingly.
      </p>

      <h2 id="extensibility">Extensibility</h2>
      <p>
        The data layer is provider-agnostic. New sources implement a single
        provider contract and feed into the same normalization and scoring stages,
        so coverage can expand without reshaping the product.
      </p>
    </DocArticle>
  );
}
