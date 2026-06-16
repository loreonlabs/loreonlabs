import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, SectionHeader, StatCard, Badge, BackLink } from "@/components/ui";
import { ExternalLinks } from "@/components/ui/ExternalLinks";
import { getBuilder } from "@/lib/intel/founders";
import { formatCompact, timeAgo } from "@/lib/format";
import { toSlug } from "@/lib/intel/projects";
import { StarIcon } from "@/components/icons";

export const dynamic = "force-dynamic";
export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug} · Builder` };
}

export default async function FounderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { status, data } = await getBuilder(slug);
  if (status === "empty" || (status === "ok" && !data)) notFound();

  if (!data) {
    return (
      <>
        <div className="mb-4">
          <BackLink href="/founders" label="Founders & Builders" />
        </div>
        <PageHeader eyebrow="Builder" title="Profile unavailable" description="GitHub did not return this user." />
      </>
    );
  }

  const { profile, repos, ecosystemNames } = data;

  return (
    <>
      <div className="mb-4">
        <BackLink href="/founders" label="Founders & Builders" />
      </div>

      <PageHeader
        eyebrow={profile.company ?? "GitHub builder"}
        title={profile.name || profile.login}
        description={profile.bio || `@${profile.login}${profile.location ? ` · ${profile.location}` : ""}`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {ecosystemNames.map((e) => (
              <Badge key={e} tone="accent">{e}</Badge>
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard label="Followers" value={formatCompact(profile.followers)} />
          <StatCard label="Public repos" value={formatCompact(profile.publicRepos)} />
          <StatCard label="Ecosystems" value={String(ecosystemNames.length || "—")} />
        </div>
      </section>

      <section className="page-section">
        <SectionHeader title="Recent repositories" description="Most recently pushed, live from GitHub." />
        {repos.length === 0 ? (
          <p className="t-body">No public repositories.</p>
        ) : (
          <div className="card-grid">
            {repos.map((r) => (
              <Link
                key={r.fullName}
                href={`/projects/${toSlug(r.fullName)}`}
                className="hairline-top group flex h-full flex-col rounded-2xl border border-border/70 bg-surface/60 p-4 transition-colors hover:border-accent/40 hover:bg-surface"
              >
                <div className="truncate text-sm font-semibold text-foreground">{r.fullName.split("/")[1]}</div>
                <p className="mt-1.5 line-clamp-2 text-[13px] text-muted">{r.description || "No description."}</p>
                <div className="mt-auto flex items-center justify-between pt-3 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <StarIcon width={12} height={12} className="text-accent" />
                    {formatCompact(r.stars)}
                  </span>
                  <span>updated {timeAgo(r.pushedAt) || "recently"}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
