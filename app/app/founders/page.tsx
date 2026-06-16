import type { Metadata } from "next";
import { PageHeader, SectionHeader, ContentCard, Badge, TrendPill } from "@/components/ui";
import { founders } from "@/lib/data";

export const metadata: Metadata = { title: "Founders" };

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function FoundersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Founders"
        title="Monitor founders and operators"
        description="Builders and operators gaining attention across the ecosystem — mapped by reputation, shipping cadence, and emerging signal."
      />

      <section className="page-section">
        <SectionHeader
          title="Rising founders"
          description="Signal score reflects momentum across communities and developer activity."
        />
        <div className="card-grid">
          {founders.map((f) => (
            <ContentCard
              key={f.id}
              title={f.name}
              description={f.focus}
              leading={
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 font-mono text-xs font-semibold text-accent">
                  {initials(f.name)}
                </span>
              }
              trailing={
                <div>
                  <div className="font-mono text-sm font-semibold text-foreground">
                    {f.signalScore}
                  </div>
                  <div className="text-[9px] uppercase tracking-wide text-muted">signal</div>
                </div>
              }
              tags={
                <>
                  <Badge tone="accent">{f.handle}</Badge>
                  <TrendPill trend={f.trend} value={f.momentum} />
                </>
              }
              footer={
                <div className="w-full">
                  <ul className="space-y-1">
                    {f.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-[11px] text-muted">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          ))}
        </div>
      </section>
    </>
  );
}
