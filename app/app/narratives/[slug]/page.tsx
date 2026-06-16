import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, SectionHeader, StatCard, Badge, BackLink } from "@/components/ui";
import { getNarrative } from "@/lib/intel/narratives";
import { themeById, ecosystemById } from "@/lib/intel/config";
import { timeAgo } from "@/lib/format";
import { ExternalIcon } from "@/components/icons";

export const dynamic = "force-dynamic";
export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: themeById(slug)?.name ?? "Narrative" };
}

export default async function NarrativeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { status, data } = await getNarrative(slug);
  if (status === "empty" || (status === "ok" && !data)) notFound();
  if (!data) notFound();

  return (
    <>
      <div className="mb-4">
        <BackLink href="/narratives" label="Narratives" />
      </div>

      <PageHeader
        eyebrow={data.category}
        title={data.name}
        description={data.aiSummary || "Live coverage clustered from real news and developer sources."}
      >
        <div className="flex flex-wrap items-center gap-2">
          {data.ecosystems.map((e) => (
            <Link key={e} href={`/ecosystems/${e}`}>
              <Badge tone="accent">{ecosystemById(e)?.name ?? e}</Badge>
            </Link>
          ))}
        </div>
      </PageHeader>

      <section className="page-section">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard label="Articles" value={String(data.allSources.length)} />
          <StatCard label="This week" value={String(data.recentCount)} trend={data.recentCount > 0 ? "up" : "flat"} />
          <StatCard label="Latest" value={data.latestDate ? timeAgo(data.latestDate) : "—"} />
        </div>
      </section>

      {data.aiSummary && (
        <section className="page-section">
          <SectionHeader title="Summary" description="Synthesized by Tavily from current web sources." />
          <p className="t-body max-w-2xl text-[15px]">{data.aiSummary}</p>
        </section>
      )}

      <section className="page-section">
        <SectionHeader title="Sources" description="Every source links to the original article." />
        {data.allSources.length === 0 ? (
          <p className="t-body">No recent sources matched this narrative.</p>
        ) : (
          <ul className="space-y-2">
            {data.allSources.slice(0, 30).map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 p-3.5 transition-colors hover:border-accent/40"
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium text-foreground">{s.title}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted">
                      <span className="text-accent">{s.source}</span>
                      {s.publishedAt && <span>{timeAgo(s.publishedAt)}</span>}
                    </div>
                  </div>
                  <ExternalIcon width={15} height={15} className="shrink-0 text-muted group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
