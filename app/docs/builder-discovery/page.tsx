import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Builder Discovery" };

export default function Page() {
  return (
    <DocArticle
      href="/builder-discovery"
      title="Builder discovery"
      description="How LoreonLabs finds real builders — discovered from the live contributor graphs of each ecosystem's official repositories, not a hand-written list."
    >
      <h2 id="how">How builders are found</h2>
      <p>
        For each ecosystem we track a set of official, well-known repositories.
        We read their live contributor graphs and aggregate the people who
        actually ship — deduped across repositories, with bots removed.
      </p>
      <ul>
        <li>Every builder is a real, verifiable account.</li>
        <li>Contributions, repositories, and stars come straight from GitHub.</li>
        <li>Profiles, websites, and X handles are pulled from the public profile.</li>
      </ul>

      <h2 id="curated">Curated personalities</h2>
      <p>
        A small set of notable founders are pinned so they surface regardless of
        recent commit volume. These are included only with verifiable handles —
        we never fabricate an account or a link.
      </p>

      <h2 id="coverage">Coverage</h2>
      <p>
        Coverage grows with the tracked repository set. Adding an ecosystem&apos;s
        core repos automatically brings its contributors into discovery — no
        individuals are hardcoded.
      </p>

      <h2 id="reach">Cross-project reach</h2>
      <p>
        Because we aggregate across many repositories, a builder who contributes
        to several core projects is recognized as more <em>connected</em> — a real
        signal of ecosystem influence.
      </p>
    </DocArticle>
  );
}
