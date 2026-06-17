import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, SectionHeader, StatCard, Badge, BackLink } from "@/components/ui";
import { ExternalLinks } from "@/components/ui/ExternalLinks";
import { getProject, fromSlug } from "@/lib/intel/projects";
import { getSiteEnrichment } from "@/lib/intel/enrichment";
import { EnrichmentSection } from "@/components/platform/EnrichmentSection";
import { KeyContributors } from "@/components/platform/KeyContributors";
import { teamForRepoOwner } from "@/lib/intel/config";
import { formatCompact, timeAgo, stageLabels } from "@/lib/format";

export const dynamic = "force-dynamic";
export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: fromSlug(slug).split("/")[1] ?? "Project" };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Curated team is derived from the slug (no API) so it renders even if live
  // GitHub discovery is unavailable — failsafe per the enrichment spec.
  const team = teamForRepoOwner(fromSlug(slug).split("/")[0] ?? "");
  const { status, data } = await getProject(slug);
  if (status === "empty" || (status === "ok" && !data)) notFound();

  if (!data) {
    return (
      <>
        <div className="mb-4">
          <BackLink href="/ecosystems" label="Ecosystems" />
        </div>
        <PageHeader eyebrow="Project" title="Project unavailable" description="This repository is unavailable." />
        {team && <KeyContributors team={team} />}
      </>
    );
  }

  const { project, commits, contributors } = data;
  const enrich = await getSiteEnrichment(project.website);

  return (
    <>
      <div className="mb-4">
        <BackLink href="/ecosystems" label="Ecosystems" />
      </div>

      <PageHeader
        eyebrow={data.ecosystemName ?? project.category}
        title={project.name}
        description={project.description || `${project.fullName}`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">{project.category}</Badge>
            <Badge tone="muted">{stageLabels[project.stage]}</Badge>
            {project.topics.slice(0, 4).map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <ExternalLinks
            links={[
              { kind: "github", label: "GitHub", href: project.github },
              { kind: "website", label: "Website", href: project.website ?? "" },
            ]}
          />
        </div>
      </PageHeader>

      <section className="page-section">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Stars" value={formatCompact(project.stars)} />
          <StatCard label="Forks" value={formatCompact(project.forks)} />
          <StatCard label="Contributors" value={String(contributors.length || "—")} />
          <StatCard label="Last push" value={timeAgo(project.pushedAt) || "—"} />
        </div>
      </section>

      {enrich.status === "ok" && enrich.data && (
        <EnrichmentSection enrichment={enrich.data} title="About this project" />
      )}

      {team && <KeyContributors team={team} />}

      <div className="page-section grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeader title="Recent commits" description="Latest commits." />
          {commits.length === 0 ? (
            <p className="t-body">No recent commits available.</p>
          ) : (
            <ul className="space-y-2">
              {commits.map((c) => (
                <li key={c.sha}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-border/60 bg-surface p-3 transition-colors hover:border-accent/40"
                  >
                    <div className="truncate text-[13px] text-foreground">{c.message}</div>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-muted">
                      <span className="font-mono text-accent-ink">{c.sha}</span>
                      <span>{c.author}</span>
                      <span>{timeAgo(c.date)}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <SectionHeader title="Top contributors" description="Builders behind this project." />
          {contributors.length === 0 ? (
            <p className="t-body">No contributor data available.</p>
          ) : (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {contributors.map((c) => (
                <Link
                  key={c.login}
                  href={`/builders/${c.login}`}
                  className="flex items-center gap-3 rounded-lg border border-border/60 bg-surface p-2.5 transition-colors hover:border-accent/40"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.avatarUrl} alt="" width={28} height={28} className="h-7 w-7 rounded-full" />
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-medium text-foreground">{c.login}</div>
                    <div className="text-[11px] text-muted">{formatCompact(c.contributions)} commits</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
