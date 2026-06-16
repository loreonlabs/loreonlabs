import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Launchpad Tracking" };

export default function Page() {
  return (
    <DocArticle
      href="/launchpad-tracking"
      title="Launchpad tracking"
      description="How LoreonLabs tracks the launchpad layer — the platforms where new tokens and agents are born — using official sources only."
    >
      <h2 id="what">What we track</h2>
      <p>
        Each launchpad is described from its official website and docs, mapped to
        its chain and ecosystem, and linked to the relevant narratives, projects,
        and builders. We never invent launch statistics.
      </p>

      <h2 id="sources">Official sources only</h2>
      <ul>
        <li>Official site and documentation links.</li>
        <li>Live site extraction for a current summary and recent updates.</li>
        <li>Matched news mentions from the live article pool.</li>
      </ul>

      <h2 id="metrics">No fabricated metrics</h2>
      <p>
        If a usage or volume number cannot be sourced from an official endpoint,
        it is simply not shown. Where data exists, it links back to the source.
      </p>

      <h2 id="coverage">Coverage</h2>
      <p>
        The launchpad layer spans Base (Bankr, Clanker, Flaunch, Virtuals) and
        Solana (Pump.fun, Believe, Bonk.fun), and grows as new platforms emerge.
      </p>
    </DocArticle>
  );
}
