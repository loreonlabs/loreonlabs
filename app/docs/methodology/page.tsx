import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Methodology" };

export default function MethodologyPage() {
  return (
    <DocArticle
      href="/methodology"
      title="Methodology"
      description="How LoreonLabs turns raw, noisy signals from across the open web into ranked, actionable intelligence."
    >
      <h2 id="pipeline">The pipeline</h2>
      <p>
        Loreon follows a consistent path from raw input to actionable output. Each
        stage is source-agnostic, so new providers can be added without changing
        the downstream model.
      </p>
      <ul>
        <li>
          <strong>Ingest</strong> — collect signals from web sources, community
          discussion, developer activity, and market data.
        </li>
        <li>
          <strong>Normalize</strong> — extract clean text and entities, then map
          everything to a shared schema for narratives, founders, and projects.
        </li>
        <li>
          <strong>Correlate</strong> — cluster related signals and link them to the
          ecosystems and people they involve.
        </li>
        <li>
          <strong>Score</strong> — compute an attention score and momentum for each
          entity. See <a href="/attention-score">Attention Score</a>.
        </li>
        <li>
          <strong>Surface</strong> — rank and present results across Discovery,
          Narratives, Founders, Projects, Ecosystems, and Markets.
        </li>
      </ul>

      <h2 id="principles">Design principles</h2>
      <ul>
        <li>
          <strong>Early over loud.</strong> The goal is to surface signal before it
          becomes obvious, not to echo what is already trending.
        </li>
        <li>
          <strong>Source diversity.</strong> No single source dominates; signals are
          corroborated across categories.
        </li>
        <li>
          <strong>Transparency.</strong> Every surfaced item carries its provenance
          so you can judge why it appeared.
        </li>
      </ul>

      <h2 id="cadence">Update cadence</h2>
      <p>
        Signals are designed to refresh continuously. Attention scores reflect
        rolling windows so that momentum, not just absolute volume, drives ranking.
      </p>
    </DocArticle>
  );
}
