import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Market Methodology" };

export default function Page() {
  return (
    <DocArticle
      href="/market-methodology"
      title="Market methodology"
      description="Where market data comes from and how it's presented — live, attributed, and never synthetic."
    >
      <h2 id="source">Data source</h2>
      <p>
        Market data is sourced live from a market-data provider: prices, market
        cap, fully diluted valuation, 24h volume, supply, rank, and multi-window
        price change. Asset metadata (categories, links) comes from the same
        source.
      </p>

      <h2 id="coverage">Coverage</h2>
      <ul>
        <li>100+ assets by market cap, plus gainers, losers, and trending.</li>
        <li>Related assets surfaced by shared category.</li>
        <li>Each asset links to its market source, official site, and socials.</li>
      </ul>

      <h2 id="context">Context, not just price</h2>
      <p>
        Asset pages connect markets to the rest of the platform: related
        ecosystems, narratives, and recent news — so a token is never just a price.
      </p>
    </DocArticle>
  );
}
