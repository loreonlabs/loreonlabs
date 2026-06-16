import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Attention Score" };

export default function AttentionScorePage() {
  return (
    <DocArticle
      href="/attention-score"
      title="Attention Score"
      description="Attention is measured from real, live signals — not a fabricated number. Each surface is ranked by a concrete metric drawn from its source data."
    >
      <h2 id="what-it-measures">What it measures</h2>
      <p>
        Attention reflects <strong>emerging interest</strong> in a narrative,
        builder, project, or market — computed live from the underlying sources.
        It is weighted toward acceleration, so something small but fast-moving can
        outrank something large but flat. Each surface is ranked by a concrete,
        real metric: markets by 24h change and market cap, projects by stars and
        recent activity, builders by contributions, and narratives by article
        momentum.
      </p>
      <p>
        Importantly, LoreonLabs does <strong>not</strong> invent 0–100 scores or
        place entities by hand. Every number shown — stars, 24h change, article
        counts, contributions, momentum — comes from a real source.
      </p>

      <h2 id="inputs">Inputs</h2>
      <p>The score blends several normalized inputs:</p>
      <ul>
        <li>
          <strong>Social velocity</strong> — rate of change in mentions and
          discussion across communities.
        </li>
        <li>
          <strong>Developer activity</strong> — commits, releases, and contributor
          growth where applicable.
        </li>
        <li>
          <strong>Market attention</strong> — market data and liquidity context for
          relevant entities.
        </li>
        <li>
          <strong>Source diversity</strong> — how many independent sources
          corroborate the signal.
        </li>
      </ul>

      <h2 id="tiers">Tiers</h2>
      <p>
        Scores roll up into readable tiers so you can scan quickly without reading
        every number:
      </p>
      <ul>
        <li>
          <strong>Emerging</strong> — early but accelerating; little mainstream
          awareness yet.
        </li>
        <li>
          <strong>Accelerating</strong> — momentum is compounding across sources.
        </li>
        <li>
          <strong>Mainstream</strong> — broadly recognized; attention is saturated.
        </li>
        <li>
          <strong>Cooling</strong> — attention is receding from a prior peak.
        </li>
      </ul>

      <h2 id="interpreting">Interpreting the score</h2>
      <p>
        Treat the score as a <em>relative</em> ranking signal, not an absolute
        verdict. The momentum value beside it tells you direction; the tier tells
        you stage. Read them together with the underlying sources.
      </p>
    </DocArticle>
  );
}
