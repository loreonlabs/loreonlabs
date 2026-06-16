import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Ecosystem Discovery" };

export default function Page() {
  return (
    <DocArticle
      href="/ecosystem-discovery"
      title="Ecosystem discovery"
      description="How LoreonLabs tracks ecosystems — combining real developer activity, project discovery, builder graphs, and live news into one view per chain or theme."
    >
      <h2 id="what">What an ecosystem page aggregates</h2>
      <ul>
        <li><strong>Projects</strong> — discovered live via the ecosystem&apos;s GitHub topic.</li>
        <li><strong>Builders</strong> — the contributors of its core repositories.</li>
        <li><strong>Launchpads</strong> — curated official platforms in that ecosystem.</li>
        <li><strong>Narratives</strong> — the themes most relevant to it.</li>
        <li><strong>News</strong> — live articles matched to the ecosystem&apos;s keywords.</li>
      </ul>

      <h2 id="config">How an ecosystem is defined</h2>
      <p>
        Each tracked ecosystem maps to a GitHub topic (for projects), a set of
        seed repositories (for builders), keywords (for news), and the narrative
        themes it participates in. Numbers are always computed from live data.
      </p>

      <h2 id="breadth">Breadth</h2>
      <p>
        LoreonLabs tracks the major L1s and L2s plus cross-cutting themes such as
        AI and DeFi. New ecosystems are added by defining their topic, repos, and
        keywords — the rest is discovered automatically.
      </p>
    </DocArticle>
  );
}
