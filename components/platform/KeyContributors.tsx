import Link from "next/link";
import { SectionHeader, Badge } from "@/components/ui";
import { XSocialIcon, ArrowRight } from "@/components/icons";
import { resolveTeam, ecosystemById, type CuratedTeam } from "@/lib/intel/config";

/**
 * Key Contributors — an additive, curated section. Pure data (no API), so it
 * always renders even if live discovery fails. People link to their builder
 * page and X; project accounts link to X only.
 */
export function KeyContributors({ team }: { team: CuratedTeam }) {
  const cards = resolveTeam(team);
  if (cards.length === 0) return null;

  const official = team.official.replace(/^https?:\/\/x\.com\//, "@");

  return (
    <section className="page-section">
      <SectionHeader
        title="Key Contributors"
        description={`People and accounts building ${team.name}.`}
        actions={
          <a
            href={team.official}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent hover:underline"
          >
            {official}
          </a>
        }
      />

      <div className="card-grid">
        {cards.map((c) => (
          <div
            key={c.handle}
            className="hairline-top flex h-full flex-col rounded-2xl border border-border/70 bg-surface/60 p-4"
          >
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.avatar}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-full bg-background/60"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-semibold text-foreground">{c.name}</span>
                  {c.isAccount && <Badge>Official</Badge>}
                </div>
                <div className="truncate text-[11px] text-muted">@{c.handle}</div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.ecosystems.map((id) => (
                <Link key={id} href={`/ecosystems/${id}`}>
                  <Badge tone="accent">{ecosystemById(id)?.name ?? id}</Badge>
                </Link>
              ))}
              <Link href={c.projectHref}>
                <Badge tone="muted">{c.projectName}</Badge>
              </Link>
            </div>

            <div className="mt-auto flex items-center gap-2 pt-4">
              {c.builderSlug && (
                <Link
                  href={`/builders/${c.builderSlug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/60 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent/40"
                >
                  View Builder
                  <ArrowRight width={13} height={13} className="text-accent" />
                </Link>
              )}
              <a
                href={c.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/60 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-foreground"
              >
                <XSocialIcon width={12} height={12} />
                Open X
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
