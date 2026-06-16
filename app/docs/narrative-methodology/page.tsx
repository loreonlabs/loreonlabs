import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Narrative Methodology" };

export default function Page() {
  return (
    <DocArticle
      href="/narrative-methodology"
      title="Narrative methodology"
      description="How LoreonLabs clusters live coverage into narratives — real articles, real dates, no fabricated themes."
    >
      <h2 id="themes">Themes</h2>
      <p>
        A narrative is a theme — a category, not a fictional entity. Each theme
        carries a set of keywords and a research query used to gather real,
        relevant coverage.
      </p>

      <h2 id="clustering">Clustering</h2>
      <ul>
        <li>A broad pool of articles is built from many news feeds and developer forums.</li>
        <li>Articles are matched to themes by keyword, deduped by URL.</li>
        <li>Counts, momentum, and the latest date are computed from the matched set.</li>
        <li>A research summary and additional cited sources are added on the detail page.</li>
      </ul>

      <h2 id="hide">Hiding thin narratives</h2>
      <p>
        Themes without enough real coverage are hidden until they have substance —
        the platform never shows an empty or &quot;monitoring&quot; narrative.
      </p>

      <h2 id="links">Everything links out</h2>
      <p>
        Every source in a narrative timeline links to the original article, with
        its publication and date shown.
      </p>
    </DocArticle>
  );
}
