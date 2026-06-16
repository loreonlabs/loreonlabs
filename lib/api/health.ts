import "server-only";

import type { ApiHealth } from "./client";
import { testTavily } from "./tavily";
import { testCoinGecko } from "./coingecko";
import { testGitHub } from "./github";
import { testJina } from "./jina";
import { testFirecrawl } from "./firecrawl";
import { testHackerNews } from "./hackernews";
import { testRss } from "./rss";

/**
 * Aggregate health probe for every integration. Each probe is self-contained
 * and never throws, so one failing service can't crash the whole check.
 */

export type IntegrationKey =
  | "tavily"
  | "coingecko"
  | "github"
  | "jina"
  | "firecrawl"
  | "hackernews"
  | "rss";

export interface IntegrationsHealth {
  ok: boolean;
  generatedAt: string;
  services: Record<IntegrationKey, ApiHealth>;
}

export async function runIntegrationsHealth(): Promise<IntegrationsHealth> {
  const [tavily, coingecko, github, jina, firecrawl, hackernews, rss] = await Promise.all([
    testTavily(),
    testCoinGecko(),
    testGitHub(),
    testJina(),
    testFirecrawl(),
    testHackerNews(),
    testRss(),
  ]);

  const services: Record<IntegrationKey, ApiHealth> = {
    tavily,
    coingecko,
    github,
    jina,
    firecrawl,
    hackernews,
    rss,
  };

  return {
    ok: Object.values(services).every((s) => s.ok),
    generatedAt: new Date().toISOString(),
    services,
  };
}
