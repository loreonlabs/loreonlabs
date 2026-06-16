import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Market Ranking" };

export default function Page() {
  return (
    <DocArticle
      href="/market-ranking"
      title="Market ranking"
      description="Markets are ranked from live market data — no synthetic scores are applied."
    >
      <h2 id="surfaces">How markets are ordered</h2>
      <ul>
        <li><strong>Top gainers / losers</strong> — by 24h percentage change.</li>
        <li><strong>Market-cap leaders</strong> — by market capitalization.</li>
        <li><strong>Trending</strong> — the live trending endpoint.</li>
        <li><strong>Top by market cap</strong> — the largest assets, 100+ deep.</li>
      </ul>

      <h2 id="detail">Asset detail</h2>
      <p>
        Each asset page shows price, market cap, FDV, 24h volume, circulating and
        total supply, rank, and 24h/7d/30d change — plus related assets,
        ecosystems, narratives, and recent news. Every number is live.
      </p>

      <h2 id="no-score">No fabricated score</h2>
      <p>
        Markets are never assigned an invented &quot;attention score.&quot; Ordering uses
        the real fields above and links back to the source.
      </p>
    </DocArticle>
  );
}
