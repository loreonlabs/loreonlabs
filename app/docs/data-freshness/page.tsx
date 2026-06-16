import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "Data Freshness" };

export default function Page() {
  return (
    <DocArticle
      href="/data-freshness"
      title="Data freshness"
      description="How current the data is, and how caching keeps the platform fast without going stale."
    >
      <h2 id="live">Live by default</h2>
      <p>
        Every product page is rendered on demand from live sources. Nothing on a
        page is baked in at build time.
      </p>

      <h2 id="cadence">Refresh cadence</h2>
      <ul>
        <li><strong>Markets</strong> — about a minute.</li>
        <li><strong>News &amp; narratives</strong> — minutes.</li>
        <li><strong>Builders &amp; projects</strong> — around ten minutes.</li>
        <li><strong>Site enrichment</strong> — hours (site content changes slowly).</li>
      </ul>

      <h2 id="caching">Caching</h2>
      <p>
        Responses are cached per source with a time-to-live tuned to how fast each
        signal changes. The first request after a window expires refreshes the
        data; subsequent requests are served instantly from cache.
      </p>

      <h2 id="degradation">Graceful degradation</h2>
      <p>
        If a source is temporarily unavailable, the affected section shows an empty
        or error state — never stale fabricated data.
      </p>
    </DocArticle>
  );
}
