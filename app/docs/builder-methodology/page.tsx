import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Builder Methodology" };

export default function Page() {
  return (
    <DocArticle
      href="/builder-methodology"
      title="Builder methodology"
      description="How LoreonLabs profiles real builders — every field sourced from a public profile or contribution graph."
    >
      <h2 id="profile">What a profile contains</h2>
      <ul>
        <li>Avatar, name, and bio from the public profile.</li>
        <li>GitHub, X, and website links.</li>
        <li>Followers, public repositories, and recent stars.</li>
        <li>Repositories owned and most-recently-pushed activity.</li>
        <li>Ecosystem tags, connected narratives, and related builders.</li>
      </ul>

      <h2 id="real">Real people only</h2>
      <p>
        Builders are discovered from contributor graphs, not invented. Curated
        personalities are added only with verifiable handles; when a profile has
        no GitHub, links and avatar resolve from their verified social account.
      </p>

      <h2 id="related">Relationships</h2>
      <p>
        Each builder connects to the projects they own, the narratives their
        ecosystem participates in, and other builders in the same ecosystem — so
        the graph is explorable end to end.
      </p>
    </DocArticle>
  );
}
