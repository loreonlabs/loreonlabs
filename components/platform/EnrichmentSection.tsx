import { SectionHeader } from "@/components/ui";
import { ExternalIcon, GlobeIcon, BookIcon, ClockIcon } from "@/components/icons";
import type { SiteEnrichment } from "@/lib/intel/enrichment";

/**
 * Renders Firecrawl-derived site intelligence (extracted summary, docs / blog /
 * changelog, latest updates, related links). Render only when enrichment data
 * is present — the caller hides it otherwise (no placeholders).
 */
function Chip({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-surface/60 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-foreground"
    >
      {icon}
      {label}
    </a>
  );
}

export function EnrichmentSection({
  enrichment,
  title = "About this site",
}: {
  enrichment: SiteEnrichment;
  title?: string;
}) {
  const { summary, docs, blog, changelog, updates, related } = enrichment;
  const updatesUrl = changelog ?? blog;

  return (
    <section className="page-section">
      <SectionHeader title={title} description="Pulled live from the official website." />

      {summary && <p className="t-body max-w-2xl text-[15px]">{summary}</p>}

      {(docs || blog || changelog || related.length > 0) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {docs && <Chip href={docs} label="Docs" icon={<BookIcon width={13} height={13} />} />}
          {changelog && <Chip href={changelog} label="Changelog" icon={<ClockIcon width={13} height={13} />} />}
          {blog && <Chip href={blog} label="Blog" icon={<GlobeIcon width={13} height={13} />} />}
          {related.map((r) => (
            <Chip key={r.href} href={r.href} label={r.label} icon={<ExternalIcon width={13} height={13} />} />
          ))}
        </div>
      )}

      {updates.length > 0 && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="t-meta uppercase tracking-wide">Latest updates</p>
            {updatesUrl && (
              <a href={updatesUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] font-medium text-accent hover:underline">
                View all
              </a>
            )}
          </div>
          <ul className="space-y-1.5">
            {updates.map((u) => (
              <li key={u} className="flex gap-2.5 text-sm text-muted">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {u}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
