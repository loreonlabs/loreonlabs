import type { Metadata } from "next";
import { DocArticle } from "@/components/docs/DocArticle";

export const metadata: Metadata = { title: "What is Loreon" };

export default function WhatIsLoreonPage() {
  return (
    <DocArticle
      href="/what-is-loreon"
      title="What is LoreonLabs"
      description="LoreonLabs is an intelligence and discovery platform that surfaces emerging narratives, founders, projects, ecosystems, and market signals before they become mainstream."
    >
      <h2 id="overview">Overview</h2>
      <p>
        LoreonLabs is a <strong>discovery engine</strong> and{" "}
        <strong>intelligence platform</strong>. It continuously monitors the open
        web, developer activity, community discussion, and market data to identify
        what is gaining attention — while it is still early.
      </p>
      <p>
        The product is organized around five intelligence surfaces: Narratives,
        Founders, Projects, Ecosystems, and Markets, unified by Discovery and a
        single search experience.
      </p>

      <h2 id="what-it-is-not">What LoreonLabs is not</h2>
      <p>
        To set expectations clearly, LoreonLabs is deliberately <em>not</em> several
        things it is often mistaken for:
      </p>
      <ul>
        <li>Not a wallet analyzer or portfolio tracker</li>
        <li>Not an AI chat application</li>
        <li>Not a meme-coin site or trading casino</li>
        <li>Not a token product</li>
      </ul>
      <p>Instead, LoreonLabs is:</p>
      <ul>
        <li>A discovery engine for emerging opportunities</li>
        <li>A signal aggregation system across many sources</li>
        <li>A research and monitoring platform for narratives and people</li>
      </ul>

      <h2 id="who-its-for">Who it is for</h2>
      <p>
        Investors, founders, researchers, and operators who need to understand
        where attention is forming before it becomes consensus — and who value a
        calm, enterprise-grade tool over noise.
      </p>
    </DocArticle>
  );
}
