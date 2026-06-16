import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, ContentCard, Badge } from "@/components/ui";
import { IntelFallback } from "@/components/ui/States";
import { listProjects, type ProjectSort, type ProjectStage } from "@/lib/intel/projects";
import { ECOSYSTEMS } from "@/lib/intel/config";
import { StarIcon } from "@/components/icons";
import { timeAgo, formatCompact, stageLabels } from "@/lib/format";

export const metadata: Metadata = { title: "Projects" };
export const dynamic = "force-dynamic";
export const revalidate = 600;

const STAGES: ProjectStage[] = ["emerging", "building", "scaling"];
const SORTS: { id: ProjectSort; label: string }[] = [
  { id: "stars", label: "Stars" },
  { id: "activity", label: "Recent activity" },
  { id: "name", label: "Name" },
];

function chip(active: boolean) {
  return `rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
    active
      ? "border-accent/40 bg-accent/10 text-foreground"
      : "border-border bg-surface/40 text-muted hover:text-foreground"
  }`;
}

function qs(params: Record<string, string | undefined>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) sp.set(k, v);
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ ecosystem?: string; stage?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  const ecosystem = ECOSYSTEMS.find((e) => e.id === sp.ecosystem)?.id;
  const stage = STAGES.find((s) => s === sp.stage);
  const sort = (SORTS.find((s) => s.id === sp.sort)?.id ?? "stars") as ProjectSort;

  const { status, data, error } = await listProjects({ ecosystem, stage, sort });

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Discover emerging projects"
        description="Real open-source projects from GitHub — stars, activity, language, and links are live. Filter by ecosystem and stage; sort by stars, activity, or name."
      />

      <section className="page-section space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Link href={qs({ stage: sp.stage, sort: sp.sort })} className={chip(!ecosystem)}>All ecosystems</Link>
          {ECOSYSTEMS.map((e) => (
            <Link key={e.id} href={qs({ ecosystem: e.id, stage: sp.stage, sort: sp.sort })} className={chip(ecosystem === e.id)}>
              {e.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href={qs({ ecosystem, sort: sp.sort })} className={chip(!stage)}>Any stage</Link>
          {STAGES.map((s) => (
            <Link key={s} href={qs({ ecosystem, stage: s, sort: sp.sort })} className={chip(stage === s)}>
              {stageLabels[s]}
            </Link>
          ))}
          <span className="mx-1 h-4 w-px bg-border" />
          {SORTS.map((s) => (
            <Link key={s.id} href={qs({ ecosystem, stage: sp.stage, sort: s.id })} className={chip(sort === s.id)}>
              {s.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section">
        {status !== "ok" ? (
          <IntelFallback
            status={status}
            error={error}
            service="GitHub"
            empty={{ title: "No projects found", message: "Try a different ecosystem or stage." }}
          />
        ) : (
          <div className="card-grid">
            {data.map((p) => (
              <ContentCard
                key={p.fullName}
                href={`/projects/${p.slug}`}
                title={p.name}
                description={p.description || "No description provided."}
                tags={
                  <>
                    <Badge tone="accent">{ECOSYSTEMS.find((e) => e.id === p.ecosystem)?.name ?? p.category}</Badge>
                    <Badge tone="muted">{stageLabels[p.stage]}</Badge>
                  </>
                }
                footer={
                  <>
                    <span className="inline-flex items-center gap-1">
                      <StarIcon width={13} height={13} className="text-accent" />
                      {formatCompact(p.stars)}
                    </span>
                    <span>updated {timeAgo(p.pushedAt) || "recently"}</span>
                  </>
                }
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
