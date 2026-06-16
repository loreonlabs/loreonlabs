import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Ranking System" };

export default function RankingSystemPage() {
  return (
    <DocArticle
      href="/ranking-system"
      title="Ranking system"
      description="How LoreonLabs orders what you see. Every ranking is computed from real, live signals — there are no invented scores or hand-placed entities."
    >
      <h2 id="principles">Principles</h2>
      <ul>
        <li>
          <strong>Real inputs only.</strong> Rankings are derived from live data
          (GitHub, CoinGecko, Hacker News, RSS, Tavily). Nothing is hardcoded.
        </li>
        <li>
          <strong>Transparent.</strong> Each surface states the exact signal it
          sorts by, so you can reason about why something appears.
        </li>
        <li>
          <strong>Recency-weighted.</strong> Momentum favors what is moving now,
          not what was large historically.
        </li>
      </ul>

      <h2 id="markets">Markets</h2>
      <p>
        Sourced live from CoinGecko. <strong>Gainers/losers</strong> sort by 24h
        percentage change; <strong>market-cap leaders</strong> sort by market
        capitalization; <strong>trending</strong> uses CoinGecko&apos;s own
        search-trending endpoint. No synthetic score is applied.
      </p>

      <h2 id="projects">Projects</h2>
      <p>
        Sourced live from GitHub repository search per ecosystem. Default sort is
        by <strong>stars</strong>; alternatives are <strong>recent activity</strong>{" "}
        (last push) and <strong>name</strong>. Stage is a transparent label
        derived from real star counts:
      </p>
      <ul>
        <li>
          <strong>Scaling</strong> — ≥ 10,000 stars
        </li>
        <li>
          <strong>Building</strong> — 1,000–9,999 stars
        </li>
        <li>
          <strong>Emerging</strong> — &lt; 1,000 stars
        </li>
      </ul>

      <h2 id="founders">Founders &amp; builders</h2>
      <p>
        Real people from GitHub. We take the top contributors of each
        ecosystem&apos;s core repositories and rank them by total{" "}
        <strong>contribution count</strong> across those repos. Profiles,
        websites, and X handles come straight from GitHub.
      </p>

      <h2 id="narratives">Narratives</h2>
      <p>
        Each narrative is a theme populated from live Hacker News and crypto news
        feeds. <strong>Momentum</strong> is the number of matching articles
        published in the last 7 days; the list sorts by momentum, then total
        article count. Summaries and additional sources come from Tavily.
      </p>

      <h2 id="ecosystems">Ecosystems</h2>
      <p>
        Ranked by <strong>recent news momentum</strong> (matching articles in the
        last 7 days). Detail pages aggregate live projects, builders, narrative
        themes, and news for that ecosystem.
      </p>

      <h2 id="no-fake">What we never do</h2>
      <ul>
        <li>No fabricated attention scores.</li>
        <li>No fictional founders, projects, or narratives.</li>
        <li>
          When a source is unavailable, we show an empty or error state — never
          placeholder data.
        </li>
      </ul>
    </DocArticle>
  );
}
