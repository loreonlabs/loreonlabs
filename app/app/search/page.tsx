import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { SearchExperience } from "@/components/platform/SearchExperience";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Search"
        title="Unified search"
        description="One query across narratives, founders, projects, ecosystems, and market signals."
      />
      <section className="page-section">
        <SearchExperience />
      </section>
    </>
  );
}
