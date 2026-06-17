import type { Metadata } from "next";
import { PageHeader, SectionHeader, Badge } from "@/components/ui";
import { integrations, type IntegrationConfig } from "@/lib/integrations";
import { serverEnv } from "@/lib/env";
import { ExternalIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Sources",
  description:
    "Where LoreonLabs sources its intelligence — the live data providers behind narratives, markets, builders, and ecosystems.",
};

export const dynamic = "force-dynamic";
export const revalidate = 600;

const categoryLabel: Record<IntegrationConfig["category"], string> = {
  search: "Research",
  extraction: "Extraction",
  social: "Social",
  developer: "Developer",
  market: "Market",
  news: "News",
};

const keyedHas = (key: string): boolean | undefined =>
  (serverEnv().has as Record<string, boolean>)[key];

function statusFor(i: IntegrationConfig): { label: string; ok: boolean } {
  if (!i.requiresKey) return { label: "Active", ok: true };
  const configured = keyedHas(i.key);
  return configured
    ? { label: "Active", ok: true }
    : { label: "Available — key not set", ok: false };
}

export default function SourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Transparency"
        title="Where Loreon gets its intelligence"
        description="Every signal on the platform is traceable to a real, configured provider. Nothing here is fabricated — sources are labelled by their live status, and each links to its own documentation."
      />

      <section className="page-section">
        <SectionHeader
          title="Live sources"
          description={`${integrations.length} providers across research, markets, developer activity, extraction, and news.`}
        />
        <div className="card-grid">
          {integrations.map((i) => {
            const status = statusFor(i);
            return (
              <div
                key={i.key}
                className="hairline-top flex h-full flex-col rounded-2xl border border-border/70 bg-surface p-5 shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="t-card-title">{i.name}</h3>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                      status.ok
                        ? "border-success/30 bg-success/10 text-success-ink"
                        : "border-border bg-surface-2 text-muted"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${status.ok ? "bg-success" : "bg-muted"}`}
                    />
                    {status.label}
                  </span>
                </div>

                <div className="mt-3">
                  <Badge tone="muted">{categoryLabel[i.category]}</Badge>
                </div>

                <p className="t-body mt-3">{i.description}</p>

                <div className="mt-4 rounded-lg border border-border/60 bg-background-secondary p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Contributes
                  </p>
                  <p className="mt-1 text-[13px] text-body">{i.contributes}</p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/50 pt-3.5 text-[11px] text-muted">
                  <span className="font-mono">
                    {i.requiresKey ? "API key" : "Public · rate-limited"}
                  </span>
                  <a
                    href={i.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-accent-ink transition-colors hover:text-accent-soft"
                  >
                    Docs
                    <ExternalIcon width={12} height={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 max-w-2xl text-[13px] leading-relaxed text-muted">
          Status reflects this environment&apos;s configuration. Providers marked{" "}
          <span className="text-success-ink">Active</span> are live; those awaiting
          a key fall back gracefully and never show placeholder data.
        </p>
      </section>
    </>
  );
}
