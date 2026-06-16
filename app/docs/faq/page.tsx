import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  {
    q: "Is LoreonLabs a trading or portfolio tool?",
    a: "No. LoreonLabs is an intelligence and discovery platform. It does not track wallets, manage portfolios, or execute trades — it surfaces emerging narratives, builders, projects, markets, and launchpads.",
  },
  {
    q: "Is the data live or mock?",
    a: "Everything is live. Markets come from a market-data provider, builders and projects from GitHub, narratives from news and developer feeds, and site enrichment from official websites. There is no mock data and there are no fabricated scores.",
  },
  {
    q: "Where does the data come from?",
    a: "From official, attributed sources only: market data, GitHub, established crypto and tech news feeds, developer forums, and live extraction of official sites and docs. Every surfaced item links back to its source.",
  },
  {
    q: "How are things ranked?",
    a: "By concrete, real metrics per surface — markets by price change and market cap, projects by stars and activity, builders by contributions and followers, and narratives by article momentum. There is no blended or invented influence score.",
  },
  {
    q: "How are builders chosen?",
    a: "They are discovered live from the contributor graphs of each ecosystem's official repositories — real, verifiable people. A few notable founders are pinned, but only with verifiable handles.",
  },
  {
    q: "Why are some narratives missing?",
    a: "Narratives without enough real article coverage are hidden rather than shown empty. As coverage lands, they appear automatically.",
  },
  {
    q: "Which ecosystems are covered?",
    a: "The major L1s and L2s — Base, Ethereum, Solana, Arbitrum, Optimism, Polygon, Bitcoin, Avalanche, Sui, Aptos, TON, NEAR, Cosmos, and more — plus cross-cutting themes like AI and DeFi.",
  },
  {
    q: "How fresh is the data?",
    a: "Pages render on demand from live sources and are cached per source with a TTL tuned to how fast each signal changes. See Data Freshness.",
  },
  {
    q: "Does LoreonLabs require a wallet or login?",
    a: "No. There is no wallet connect, no authentication, and no token. It is a research and monitoring platform.",
  },
  {
    q: "Can I see why something appeared?",
    a: "Yes. Provenance is shown on everything — articles link to the publication, builders and projects to GitHub, tokens to the market source and official site. See Source Validation.",
  },
];

export default function FaqPage() {
  return (
    <DocArticle
      href="/faq"
      title="Frequently asked questions"
      description="Quick answers to the most common questions about what LoreonLabs is and how it works."
    >
      {faqs.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
    </DocArticle>
  );
}
