import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Research Ranking" };

export default function Page() {
  return (
    <DocArticle
      href="/research-ranking"
      title="Research ranking"
      description="Narratives are ranked by real, dated article coverage — and thin narratives are hidden rather than padded."
    >
      <h2 id="momentum">Momentum</h2>
      <p>
        Each narrative is ranked by <strong>momentum</strong> — the number of
        matching articles published in the last 7 days — then by total article
        count. Both are computed from real, dated coverage.
      </p>

      <h2 id="threshold">The coverage threshold</h2>
      <ul>
        <li>A narrative must have a minimum number of real articles to appear.</li>
        <li>Narratives below the threshold are hidden — never shown empty.</li>
        <li>No &quot;0 articles&quot;, no &quot;monitoring…&quot;, no placeholders.</li>
      </ul>

      <h2 id="detail">On the detail page</h2>
      <p>
        Each narrative shows an executive summary, a dated timeline of sources,
        article count, momentum, and related narratives, ecosystems, projects, and
        builders. Every source links to the original article.
      </p>
    </DocArticle>
  );
}
