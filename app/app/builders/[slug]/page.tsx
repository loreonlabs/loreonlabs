import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, SectionHeader, StatCard, Badge, BackLink } from "@/components/ui";
import { ExternalLinks } from "@/components/ui/ExternalLinks";
import { getBuilder } from "@/lib/intel/builders";
import { ecosystemById } from "@/lib/intel/config";
import { formatCompact, timeAgo } from "@/lib/format";
import { toSlug } from "@/lib/intel/projects";
import { StarIcon } from "@/components/icons";

export const dynamic = "force-dynamic";
export const revalidate = 600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug} · Builder` };
}

export default async function BuilderDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await getBuilder(slug);
  if (!data) notFound();

  const { profile, repos, ecosystemIds, ecosystemNames, totalStars, relatedBuilders, relatedNarratives } = data;
  const recent = [...repos].sort((a, b) => Date.parse(b.pushedAt) - Date.parse(a.pushedAt)).slice(0, 4);

  return (
    <>
      <div className="mb-4">
        <BackLink href="/builders" label="Builders" />
      </div>

      <PageHeader
        eyebrow={profile.company ?? "Builder"}
        title={profile.name || profile.login}
        description={profile.bio || `@${profile.login}${profile.location ? ` · ${profile.location}` : ""}`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.avatarUrl} alt="" width={28} height={28} className="h-7 w-7 rounded-full" />
            {ecosystemIds.map((id) => (
              <Link key={id} href={`/ecosystems/${id}`}><Badge tone="accent">{ecosystemById(id)?.name ?? id}</Badge></Link>
            ))}
          </div>
          <ExternalLinks
            links={[
              { kind: "github", label: "GitHub", href: profile.url },
              { kind: "twitter", label: profile.twitter ? `@${profile.twitter}` : "", href: profile.twitter ? `https://x.com/${profile.twitter}` : "" },
              { kind: "website", label: "Website", href: profile.website ?? "" },
            ]}
          />
        </div>
      </PageHeader>

      <section className="page-section">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Followers" value={formatCompact(profile.followers)} />
          <StatCard label="Public repos" value={formatCompact(profile.publicRepos)} />
          <StatCard label="Stars (recent)" value={formatCompact(totalStars)} />
          <StatCard label="Ecosystems" value={String(ecosystemIds.length || "—")} />
        </div>
      </section>

      <div className="page-section grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeader title="Projects" description="Repositories this builder owns." />
          {repos.length === 0 ? (
            <p className="t-body">No public repositories.</p>
          ) : (
            <div className="space-y-2">
              {repos.slice(0, 8).map((r) => (
                <Link key={r.fullName} href={`/projects/${toSlug(r.fullName)}`} className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 p-3 transition-colors hover:border-accent/40">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium text-foreground">{r.fullName.split("/")[1]}</div>
                    <div className="truncate text-[11px] text-muted">{r.description || "No description."}</div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                    <StarIcon width={12} height={12} className="text-accent" />{formatCompact(r.stars)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <SectionHeader title="Recent activity" description="Most recently pushed work." />
          {recent.length === 0 ? (
            <p className="t-body">No recent activity.</p>
          ) : (
            <ul className="space-y-2">
              {recent.map((r) => (
                <li key={r.fullName}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border/60 bg-surface/40 p-3 transition-colors hover:border-accent/40">
                    <div className="truncate text-[13px] font-medium text-foreground">{r.fullName}</div>
                    <div className="mt-1 text-[11px] text-muted">pushed {timeAgo(r.pushedAt) || "recently"}</div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {relatedNarratives.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Connected narratives" />
          <div className="flex flex-wrap gap-2">
            {relatedNarratives.map((n) => (
              <Link key={n.id} href={`/research/${n.id}`}><Badge tone="accent">{n.name}</Badge></Link>
            ))}
          </div>
        </section>
      )}

      {relatedBuilders.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Related builders" description="Others building in the same ecosystem." />
          <div className="card-grid">
            {relatedBuilders.map((b) => (
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
    </>
  );
}
