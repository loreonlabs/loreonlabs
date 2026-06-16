import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Ecosystem Ranking" };

export default function Page() {
  return (
    <DocArticle
      href="/ecosystem-ranking"
      title="Ecosystem ranking"
      description="Ecosystems are ranked by live news momentum, with detail pages aggregating real projects, builders, narratives, and launchpads."
    >
      <h2 id="momentum">News momentum</h2>
      <p>
        The ecosystem list is ordered by <strong>recent news momentum</strong> —
        the count of matching articles in the last 7 days — drawn from the live
        article pool.
      </p>

      <h2 id="depth">What ranks within an ecosystem</h2>
      <ul>
        <li>Projects by stars and recent activity.</li>
        <li>Builders by contributions to the ecosystem&apos;s core repos.</li>
        <li>Narratives by article momentum.</li>
        <li>Launchpads from the curated official set.</li>
      </ul>

      <h2 id="real">Real signals only</h2>
      <p>
        Counts shown on an ecosystem page (projects, builders, news) are computed
        live. Nothing is hand-set.
      </p>
    </DocArticle>
  );
}
