import Link from "next/link";
import { PageHeader, SectionHeader, ContentCard } from "@/components/ui";
import { docsNav } from "@/lib/navigation";
import { ArrowRight, iconByName } from "@/components/icons";

export default function DocsOverviewPage() {
  const sections = docsNav.flatMap((g) => g.items).filter((i) => i.href !== "/");

  return (
    <>
      <PageHeader
        eyebrow="Documentation"
        title="LoreonLabs documentation"
        description="Understand what LoreonLabs is, why it exists, how it turns raw signals into intelligence, and where it's heading."
        actions={
          <Link href="/what-is-loreon" className="btn-primary px-4 py-2 text-[13px]">
            Start reading
            <ArrowRight width={15} height={15} />
          </Link>
        }
      />

      <section className="page-section">
        <SectionHeader title="Browse the docs" />
        <div className="card-grid-2">
          {sections.map((item) => {
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
                    <span>Read</span>
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
    </>
  );
}
