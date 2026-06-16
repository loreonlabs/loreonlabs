import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  {
    q: "Is LoreonLabs a trading or portfolio tool?",
    a: "No. LoreonLabs is an intelligence and discovery platform. It does not track wallets, manage portfolios, or execute trades. It surfaces emerging narratives, founders, projects, and signals.",
  },
  {
    q: "Where does the data come from?",
    a: "From a diverse set of sources spanning the open web, community discussion, developer activity, and market data. See the Data Sources page for the planned providers.",
  },
  {
    q: "What does the attention score mean?",
    a: "It is a 0–100 measure of emerging momentum, weighted toward acceleration. Read it alongside the momentum value and tier. See the Attention Score page for details.",
  },
  {
    q: "Does LoreonLabs require a wallet or login to browse?",
    a: "This phase focuses on the product architecture and information architecture. There is no wallet connect or authentication yet.",
  },
  {
    q: "Which ecosystems are covered?",
    a: "Coverage spans crypto, AI, and technology — including Base, Ethereum, Solana, AI, and DeFi, with room to expand.",
  },
  {
    q: "Is the data shown live yet?",
    a: "Not in this phase. The platform currently uses realistic placeholder content to establish layout and structure ahead of connecting live data sources.",
  },
];

export default function FaqPage() {
  return (
    <DocArticle
      href="/docs/faq"
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
