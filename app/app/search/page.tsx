import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { FullSearch } from "@/components/platform/FullSearch";

export const metadata: Metadata = { title: "Search" };
export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Search"
        title="Unified search"
        description="One live query across projects, founders, markets, narratives, and ecosystems. Press ⌘K anywhere to search."
      />
      <section className="page-section">
        <FullSearch />
      </section>
    </>
  );
}
