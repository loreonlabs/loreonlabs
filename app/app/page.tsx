import Link from "next/link";
import { PageHeader, SectionHeader, StatCard, ContentCard, Badge } from "@/components/ui";
import { appNav } from "@/lib/navigation";
import { discoveryMetrics, discoveryItems } from "@/lib/data";
import { ArrowRight, iconByName } from "@/components/icons";

export default function AppOverviewPage() {
  // The Intelligence group holds the primary product areas.
  const intelligence = appNav.find((g) => g.label === "Intelligence")?.items ?? [];

  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Overview"
        description="Today's signals across narratives, founders, projects, ecosystems, and markets — the fastest way into what's gaining attention."
        actions={
          <Link href="/app/discovery" className="btn-primary px-4 py-2 text-[13px]">
            Open Discovery
            <ArrowRight width={15} height={15} />
          </Link>
        }
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {discoveryMetrics.map((m) => (
            <StatCard key={m.label} {...m} />
          ))}
        </div>
      </PageHeader>

      <section className="page-section">
        <SectionHeader
          title="Explore the platform"
          description="Jump into any intelligence surface."
        />
        <div className="card-grid">
          {intelligence.map((item) => {
            const Icon = iconByName[item.icon];
            return (
              <ContentCard
                key={item.href}
                href={item.href}
                title={item.label}
                description={item.description}
                leading={
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-border/70 bg-background/60 text-accent">
                    <Icon width={16} height={16} />
                  </span>
                }
                footer={
                  <>
                    <span>View</span>
                    <ArrowRight
                      width={14}
                      height={14}
                      className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </>
                }
              />
            );
          })}
        </div>
      </section>

      <section className="page-section">
        <SectionHeader
          title="Latest signals"
          description="A live cross-section of the discovery feed."
          actions={
            <Link
              href="/app/discovery"
              className="text-sm font-medium text-accent hover:underline"
            >
              See all
            </Link>
          }
        />
        <div className="card-grid">
          {discoveryItems.slice(0, 3).map((item) => (
            <ContentCard
              key={item.id}
              title={item.title}
              description={item.summary}
              trailing={
                <span className="font-mono text-sm font-semibold text-accent">
                  {item.attentionScore}
                </span>
              }
              tags={item.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
              footer={
                <>
                  <Badge tone="accent">{item.type}</Badge>
                  <span className="capitalize">{item.tier}</span>
                </>
              }
            />
          ))}
        </div>
      </section>
    </>
  );
}
