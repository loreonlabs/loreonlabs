import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Source Validation" };

export default function Page() {
  return (
    <DocArticle
      href="/source-validation"
      title="Source validation"
      description="How LoreonLabs keeps the data trustworthy — provenance on everything, official sources only, and no invented numbers."
    >
      <h2 id="provenance">Provenance</h2>
      <p>
        Every surfaced item carries its source. Articles link to the original
        publication; builders and projects link to GitHub; tokens link to the
        market source and official site; launchpads link to official docs.
      </p>

      <h2 id="official">Official sources only</h2>
      <ul>
        <li>Market data from a market-data provider.</li>
        <li>Developer activity from GitHub.</li>
        <li>News from established crypto and tech feeds plus developer forums.</li>
        <li>Site content extracted from official websites and docs.</li>
      </ul>

      <h2 id="no-invention">No invented data</h2>
      <p>
        If a metric cannot be sourced, it is not shown. There are no fabricated
        scores, no placeholder entities, and no fictional people or projects.
      </p>

      <h2 id="resilience">Resilience</h2>
      <p>
        Sources are queried with timeouts and per-call error handling, so one
        failing provider can never corrupt a page or block the rest of the data.
      </p>
    </DocArticle>
  );
}
