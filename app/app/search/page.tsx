import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { SearchExplorer } from "@/components/platform/SearchExplorer";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search across narratives, markets, projects, builders, ecosystems, and sources.",
};

export default function SearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Search"
        title="One search across the intelligence layer"
        description="Find narratives, markets, projects, builders, ecosystems, and sources — grouped by type, linking straight to the detail."
      />
      <section className="page-section">
        <SearchExplorer />
      </section>
    </>
  );
}
