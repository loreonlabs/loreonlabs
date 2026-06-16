import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Ecosystem Methodology" };

export default function Page() {
  return (
    <DocArticle
      href="/ecosystem-methodology"
      title="Ecosystem methodology"
      description="How LoreonLabs assembles a live, interconnected view of each ecosystem from independent real sources."
    >
      <h2 id="definition">Definition</h2>
      <p>
        An ecosystem is defined by a GitHub topic, a set of seed repositories, a
        keyword set, and the narratives it participates in. From these, every
        section of the page is generated live.
      </p>

      <h2 id="sections">Sections</h2>
      <ul>
        <li><strong>Projects</strong> — repositories under the ecosystem&apos;s topic.</li>
        <li><strong>Builders</strong> — contributors of its seed repositories.</li>
        <li><strong>Launchpads</strong> — curated official platforms.</li>
        <li><strong>Narratives</strong> — relevant themes with live coverage.</li>
        <li><strong>News</strong> — articles matched to the ecosystem&apos;s keywords.</li>
      </ul>

      <h2 id="interconnected">Interconnected</h2>
      <p>
        Every entity on an ecosystem page links to its own detail page, and back —
        markets, builders, projects, narratives, and launchpads all cross-link.
      </p>
    </DocArticle>
  );
}
