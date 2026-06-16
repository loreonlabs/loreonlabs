import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, SectionHeader, Badge, BackLink } from "@/components/ui";
import { ExternalLinks } from "@/components/ui/ExternalLinks";
import { getLaunchpad } from "@/lib/intel/launchpads";
import { getSiteEnrichment } from "@/lib/intel/enrichment";
import { EnrichmentSection } from "@/components/platform/EnrichmentSection";
import { KeyContributors } from "@/components/platform/KeyContributors";
import { launchpadById, teamForLaunchpad } from "@/lib/intel/config";
import { faviconUrl, timeAgo, formatCompact, stageLabels } from "@/lib/format";
import { ExternalIcon, StarIcon } from "@/components/icons";

export const dynamic = "force-dynamic";
export const revalidate = 600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: launchpadById(slug)?.name ?? "Launchpad" };
}

export default async function LaunchpadDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await getLaunchpad(slug);
  if (!data) notFound();

  const { launchpad: l, ecosystemName, narratives, projects, builders, news } = data;
  const enrich = await getSiteEnrichment(l.website);

  return (
    <>
      <div className="mb-4">
        <BackLink href="/launchpads" label="Launchpads" />
      </div>

      <PageHeader eyebrow={`Launchpad · ${l.chain}`} title={l.name} description={l.description}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={faviconUrl(l.website)} alt="" width={28} height={28} className="h-7 w-7 rounded-lg bg-background/60" />
            <Badge tone="accent">{l.chain}</Badge>
            {ecosystemName && (
              <Link href={`/ecosystems/${l.ecosystem}`}><Badge>{ecosystemName} ecosystem</Badge></Link>
            )}
          </div>
          <ExternalLinks
            links={[
              { kind: "website", label: "Official site", href: l.website },
              { kind: "docs", label: "Docs", href: l.docs ?? "" },
            ]}
          />
        </div>
      </PageHeader>

      {enrich.status === "ok" && enrich.data && (
        <EnrichmentSection enrichment={enrich.data} title="About" />
      )}

      {teamForLaunchpad(slug) && <KeyContributors team={teamForLaunchpad(slug)!} />}

      {narratives.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Narratives" />
          <div className="flex flex-wrap gap-2">
            {narratives.map((n) => (
              <Link key={n.id} href={`/research/${n.id}`}><Badge tone="accent">{n.name}</Badge></Link>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="page-section">
          <SectionHeader title={`Projects in ${ecosystemName ?? l.chain}`} actions={<Link href={`/ecosystems/${l.ecosystem}`} className="text-sm font-medium text-accent hover:underline">Ecosystem</Link>} />
          <div className="card-grid">
            {projects.map((p) => (
              <Link key={p.fullName} href={`/projects/${p.slug}`} className="hairline-top group flex h-full flex-col rounded-2xl border border-border/70 bg-surface/60 p-4 transition-colors hover:border-accent/40 hover:bg-surface">
                <div className="truncate text-sm font-semibold text-foreground">{p.name}</div>
                <p className="mt-1.5 line-clamp-2 text-[13px] text-muted">{p.description || "No description."}</p>
                <div className="mt-auto flex items-center justify-between pt-3 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1"><StarIcon width={12} height={12} className="text-accent" />{formatCompact(p.stars)}</span>
                  <Badge tone="muted">{stageLabels[p.stage]}</Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {builders.length > 0 && (
        <section className="page-section">
          <SectionHeader title={`Builders in ${ecosystemName ?? l.chain}`} actions={<Link href={`/builders?ecosystem=${l.ecosystem}`} className="text-sm font-medium text-accent hover:underline">All builders</Link>} />
          <div className="card-grid">
            {builders.map((b) => (
              <Link key={b.login} href={`/builders/${b.login}`} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/60 p-3.5 transition-colors hover:border-accent/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.avatarUrl} alt="" width={36} height={36} className="h-9 w-9 rounded-full" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">{b.name ?? b.login}</div>
                  <div className="text-[11px] text-muted">{formatCompact(b.contributions)} {b.featured ? "followers" : "commits"}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {news.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Recent mentions" description="Every item links to the original article." />
          <ul className="space-y-2">
            {news.map((a) => (
              <li key={a.url}>
                <a href={a.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 p-3.5 transition-colors hover:border-accent/40">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium text-foreground">{a.title}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted">
                      <span className="text-accent">{a.source}</span>
                      {a.publishedAt && <span>{timeAgo(a.publishedAt)}</span>}
                    </div>
                  </div>
                  <ExternalIcon width={15} height={15} className="shrink-0 text-muted group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
