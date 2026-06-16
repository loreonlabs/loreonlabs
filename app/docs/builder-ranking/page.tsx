import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Builder Ranking" };

export default function Page() {
  return (
    <DocArticle
      href="/builder-ranking"
      title="Builder ranking"
      description="The builder leaderboards rank real people by real GitHub metrics — never invented influence scores."
    >
      <h2 id="boards">The leaderboards</h2>
      <ul>
        <li><strong>Top Builders</strong> — by total contributions to tracked repositories.</li>
        <li><strong>Most Referenced</strong> — by GitHub followers.</li>
        <li><strong>Most Active</strong> — by public repositories.</li>
        <li><strong>Most Connected</strong> — by the number of tracked projects a builder contributes to.</li>
        <li><strong>Rising Builders</strong> — newer accounts with strong activity.</li>
      </ul>

      <h2 id="metrics">Real metrics only</h2>
      <p>
        Every board sorts by a single, transparent GitHub field. There is no
        blended &quot;influence score&quot; and no manual placement.
      </p>

      <h2 id="featured">Featured builders</h2>
      <p>
        A few notable founders are pinned as <em>featured</em> so they surface
        regardless of recent commit volume — included only with verifiable handles.
      </p>

      <h2 id="freshness">Freshness</h2>
      <p>
        Boards refresh on a schedule and are cached between refreshes. See{" "}
        <a href="/data-freshness">Data Freshness</a>.
      </p>
    </DocArticle>
  );
}
