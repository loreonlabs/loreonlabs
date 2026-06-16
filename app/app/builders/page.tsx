import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Badge } from "@/components/ui";
import { IntelFallback } from "@/components/ui/States";
import { getBuilderBoards, type Board } from "@/lib/intel/builders";
import { ECOSYSTEMS } from "@/lib/intel/config";

export const metadata: Metadata = { title: "Builders" };
export const dynamic = "force-dynamic";
export const revalidate = 900;

function chip(active: boolean) {
  return `rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
    active ? "border-accent/40 bg-accent/10 text-foreground" : "border-border bg-surface/40 text-muted hover:text-foreground"
  }`;
}

function Leaderboard({ board }: { board: Board }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-surface/50 p-4">
      <div className="mb-3">
        <h2 className="t-section-title">{board.label}</h2>
        <p className="text-[11px] text-muted">{board.description}</p>
      </div>
      <ol className="space-y-0.5">
        {board.entries.map((e, i) => (
          <li key={e.builder.login}>
            <Link href={`/builders/${e.builder.login}`} className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-surface">
              <span className="w-4 text-right font-mono text-[11px] text-muted">{i + 1}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.builder.avatarUrl} alt="" width={28} height={28} className="h-7 w-7 rounded-full" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-medium text-foreground">{e.builder.name ?? e.builder.login}</span>
                  {e.builder.featured && <Badge tone="accent">Featured</Badge>}
                </div>
                <div className="truncate text-[11px] text-muted">@{e.builder.login}</div>
              </div>
              <span className="shrink-0 font-mono text-[11px] text-accent">{e.value}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default async function BuildersPage({
  searchParams,
}: {
  searchParams: Promise<{ ecosystem?: string }>;
}) {
  const sp = await searchParams;
  const param = sp.ecosystem;
  const ecosystem = param === "all" ? undefined : ECOSYSTEMS.find((e) => e.id === param)?.id ?? "base";
  const activeId = param === "all" ? "all" : ecosystem;
  const ecoName = ecosystem ? ECOSYSTEMS.find((e) => e.id === ecosystem)?.name : "every ecosystem";

  const { status, data, error } = await getBuilderBoards(ecosystem);

  return (
    <>
      <PageHeader
        eyebrow="Builders"
        title={`Who's building on ${ecoName}`}
        description="Real builders, discovered live from the contributor graphs of each ecosystem's official repositories. Ranked by real GitHub metrics — never invented scores. Every profile is clickable."
      />

      <section className="page-section">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/builders?ecosystem=all" className={chip(activeId === "all")}>All ecosystems</Link>
          {ECOSYSTEMS.map((e) => (
            <Link key={e.id} href={e.id === "base" ? "/builders" : `/builders?ecosystem=${e.id}`} className={chip(activeId === e.id)}>
              {e.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section">
        {status !== "ok" ? (
          <IntelFallback status={status} error={error} empty={{ title: "No builders found", message: "Try another ecosystem." }} />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {data.map((board) => (
              <Leaderboard key={board.id} board={board} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
