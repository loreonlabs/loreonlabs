import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, SectionHeader, StatCard, Badge, BackLink } from "@/components/ui";
import { getEcosystem } from "@/lib/intel/ecosystems";
import { ecosystemById } from "@/lib/intel/config";
import { formatCompact, timeAgo, stageLabels } from "@/lib/format";
import { StarIcon, ExternalIcon } from "@/components/icons";

export const dynamic = "force-dynamic";
export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: ecosystemById(slug)?.name ?? "Ecosystem" };
}

export default async function EcosystemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { status, data } = await getEcosystem(slug);
  if (status === "empty" || (status === "ok" && !data)) notFound();
  if (!data) notFound();

  const { ecosystem, projects, builders, narratives, news } = data;

  return (
    <>
      <div className="mb-4">
        <BackLink href="/ecosystems" label="Ecosystems" />
      </div>

      <PageHeader eyebrow="Ecosystem" title={ecosystem.name} description={ecosystem.blurb}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="News (recent)" value={String(ecosystem.newsCount)} />
          <StatCard label="This week" value={String(ecosystem.recentNews)} trend={ecosystem.recentNews > 0 ? "up" : "flat"} />
          <StatCard label="Projects" value={String(projects.length)} />
          <StatCard label="Builders" value={String(builders.length)} />
        </div>
      </PageHeader>

      {narratives.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Active narratives" />
          <div className="flex flex-wrap gap-2">
            {narratives.map((n) => (
              <Link key={n.id} href={`/narratives/${n.id}`}>
                <Badge tone="accent">{n.name}</Badge>
              </Link>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Active projects" description="Live from GitHub." actions={<Link href={`/projects?ecosystem=${ecosystem.id}`} className="text-sm font-medium text-accent hover:underline">View all</Link>} />
          <div className="card-grid">
            {projects.map((p) => (
              <Link
                key={p.fullName}
                href={`/projects/${p.slug}`}
                className="hairline-top group flex h-full flex-col rounded-2xl border border-border/70 bg-surface/60 p-4 transition-colors hover:border-accent/40 hover:bg-surface"
              >
                <div className="truncate text-sm font-semibold text-foreground">{p.name}</div>
                <p className="mt-1.5 line-clamp-2 text-[13px] text-muted">{p.description || "No description."}</p>
                <div className="mt-auto flex items-center justify-between pt-3 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <StarIcon width={12} height={12} className="text-accent" />
                    {formatCompact(p.stars)}
                  </span>
                  <Badge tone="muted">{stageLabels[p.stage]}</Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {builders.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Active builders" description="Top contributors to core repos." actions={<Link href={`/founders?ecosystem=${ecosystem.id}`} className="text-sm font-medium text-accent hover:underline">View all</Link>} />
          <div className="card-grid">
            {builders.map((b) => (
              <Link
                key={b.login}
                href={`/founders/${b.login}`}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/60 p-3.5 transition-colors hover:border-accent/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.avatarUrl} alt="" width={38} height={38} className="h-[38px] w-[38px] rounded-full" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">{b.login}</div>
                  <div className="text-[11px] text-muted">{formatCompact(b.contributions)} commits</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {news.length > 0 && (
        <section className="page-section">
          <SectionHeader title="Recent news" description="Every item links to the original article." />
          <ul className="space-y-2">
            {news.map((a) => (
              <li key={a.url}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 p-3.5 transition-colors hover:border-accent/40"
                >
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
