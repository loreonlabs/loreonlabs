import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Future Development" };

export default function FutureDevelopmentPage() {
  return (
    <DocArticle
      href="/future-development"
      title="Future development"
      description="Where LoreonLabs is heading — from a structured foundation to a fully connected intelligence platform."
    >
      <h2 id="vision">The vision</h2>
      <p>
        LoreonLabs aims to be the place you check first to understand where
        attention is forming across crypto, AI, and technology — a calm,
        enterprise-grade signal layer that consistently surfaces what matters
        before consensus.
      </p>

      <h2 id="data-integration">Data integration</h2>
      <p>
        The immediate next phase connects live data sources into the pipeline. The
        provider contract and environment configuration are already in place for:
      </p>
      <ul>
        <li>
          <strong>Tavily</strong> — real-time web search and source expansion
        </li>
        <li>
          <strong>Jina AI</strong> — content extraction and embeddings
        </li>
        <li>
          <strong>Reddit</strong> — community discussion and sentiment
        </li>
        <li>
          <strong>GitHub</strong> — developer activity and momentum
        </li>
        <li>
          <strong>CoinGecko</strong> — market data and attention metrics
        </li>
      </ul>

      <h2 id="roadmap">Roadmap themes</h2>
      <ul>
        <li>Live scoring and continuously refreshed attention signals</li>
        <li>Entity profiles with historical momentum and source breakdowns</li>
        <li>Saved searches, watchlists, and alerting on emerging signals</li>
        <li>Deeper ecosystem comparisons and cross-narrative analysis</li>
      </ul>

      <h2 id="principles">What will not change</h2>
      <p>
        The commitments stay constant: surface signal early, keep provenance
        transparent, and remain a focused intelligence tool — not a trading,
        portfolio, or token product.
      </p>
    </DocArticle>
  );
}
