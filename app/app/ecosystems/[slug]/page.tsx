import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, SectionHeader, StatCard, Badge, BackLink } from "@/components/ui";
import { getEcosystem } from "@/lib/intel/ecosystems";
import { ecosystemById, teamForEcosystem } from "@/lib/intel/config";
import { KeyContributors } from "@/components/platform/KeyContributors";
import { formatCompact, timeAgo, stageLabels, faviconUrl } from "@/lib/format";
import { StarIcon, ExternalIcon } from "@/components/icons";

export const dynamic = "force-dynamic";
export const revalidate = 600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: ecosystemById(slug)?.name ?? "Ecosystem" };
}

export default async function EcosystemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await getEcosystem(slug);
  if (!data) notFound();

  const { name, overview, recentNews, launchpads, projects, builders, narratives, news } = data;

  return (
    <>
      <div className="mb-4">
        <BackLink href="/ecosystems" label="Ecosystems" />
      </div>

      <PageHeader eyebrow="Ecosystem" title={name} description={overview}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Launchpads" value={String(launchpads.length || "—")} />
          <StatCard label="Projects" value={String(projects.length || "—")} />
          <StatCard label="Builders" value={String(builders.length || "—")} />
          <StatCard label="News this week" value={String(recentNews)} trend={recentNews > 0 ? "up" : "flat"} />
        </div>
      </PageHeader>

      {teamForEcosystem(slug) && <KeyContributors team={teamForEcosystem(slug)!} />}

      {launchpads.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Launchpads" actions={<Link href={`/launchpads?ecosystem=${slug}`} className="text-sm font-medium text-accent hover:underline">All</Link>} />
          <div className="card-grid">
            {launchpads.map((l) => (
              <Link key={l.id} href={`/launchpads/${l.id}`} className="hairline-top group flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/60 p-4 transition-colors hover:border-accent/40 hover:bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={faviconUrl(l.website)} alt="" width={32} height={32} className="h-8 w-8 rounded-lg bg-background/60" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-foreground">{l.name}</div>
                  <div className="line-clamp-1 text-[11px] text-muted">{l.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {narratives.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Narratives" actions={<Link href="/research" className="text-sm font-medium text-accent hover:underline">Research</Link>} />
          <div className="card-grid">
            {narratives.map((n) => (
              <Link key={n.id} href={`/research/${n.id}`} className="hairline-top group h-full rounded-2xl border border-border/70 bg-surface/60 p-4 transition-colors hover:border-accent/40 hover:bg-surface">
                <div className="text-sm font-semibold text-foreground">{n.name}</div>
                <p className="mt-1.5 line-clamp-2 text-[13px] text-muted">{n.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Top projects" />
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
          <SectionHeader title="Top builders" actions={<Link href={`/builders?ecosystem=${slug}`} className="text-sm font-medium text-accent hover:underline">All builders</Link>} />
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
          <SectionHeader title="Recent articles" description="Every item links to the original." />
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
