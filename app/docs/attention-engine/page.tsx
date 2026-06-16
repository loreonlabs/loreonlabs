import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Attention Engine" };

export default function Page() {
  return (
    <DocArticle
      href="/attention-engine"
      title="The Attention Engine"
      description="How LoreonLabs turns raw, live signals into a single, comparable read on what's gaining attention — computed entirely from real data."
    >
      <h2 id="what">What it does</h2>
      <p>
        The attention engine ingests live signals from every connected source,
        normalizes them into a shared model, and ranks what is accelerating. It
        never invents numbers — every figure traces back to a real source.
      </p>

      <h2 id="inputs">Inputs</h2>
      <ul>
        <li><strong>Market data</strong> — prices, market cap, and 24h/7d/30d change.</li>
        <li><strong>Developer activity</strong> — commits, contributors, stars, and recency.</li>
        <li><strong>News &amp; social</strong> — articles across crypto and tech feeds plus developer forums.</li>
        <li><strong>Web extraction</strong> — official sites, docs, and changelogs.</li>
      </ul>

      <h2 id="model">From signal to intelligence</h2>
      <ul>
        <li><strong>Ingest</strong> live data from each source.</li>
        <li><strong>Normalize</strong> into narratives, builders, projects, ecosystems, and markets.</li>
        <li><strong>Correlate</strong> entities to the themes and ecosystems they belong to.</li>
        <li><strong>Rank</strong> by a concrete, real metric per surface.</li>
        <li><strong>Surface</strong> the result, with provenance on every item.</li>
      </ul>

      <h2 id="acceleration">Weighted toward acceleration</h2>
      <p>
        The engine favors momentum over size: a small project moving fast can
        outrank a large but flat one. The exact metric for each surface is
        documented in its ranking page.
      </p>
    </DocArticle>
  );
}
