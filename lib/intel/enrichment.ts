import "server-only";

import { serverEnv } from "@/lib/env";
import * as firecrawl from "@/lib/api/firecrawl";
import { intel, type Intel } from "./result";

/**
 * Site enrichment via Firecrawl — extracts a clean summary from an official
 * website, discovers docs / blog / changelog, pulls recent updates, and surfaces
 * related links. Cached (12h in the client) and fully optional: when the key or
 * a website is missing it returns disabled/empty so the UI simply hides the
 * section — never a placeholder.
 */

export interface RelatedLink {
  label: string;
  href: string;
}

export interface SiteEnrichment {
  url: string;
  title: string;
  summary: string;
  docs?: string;
  blog?: string;
  changelog?: string;
  updates: string[];
  related: RelatedLink[];
}

const SOCIALS: { test: RegExp; label: string }[] = [
  { test: /(^|\.)x\.com$|(^|\.)twitter\.com$/, label: "X" },
  { test: /(^|\.)github\.com$/, label: "GitHub" },
  { test: /(^|\.)discord\.(gg|com)$/, label: "Discord" },
  { test: /(^|\.)t\.me$|telegram/, label: "Telegram" },
  { test: /(^|\.)warpcast\.com$|(^|\.)farcaster\.xyz$/, label: "Farcaster" },
  { test: /(^|\.)mirror\.xyz$/, label: "Mirror" },
  { test: /(^|\.)youtube\.com$|(^|\.)youtu\.be$/, label: "YouTube" },
];

function host(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function cleanMarkdown(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links → text
    .replace(/[*_`>#]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function firstParagraph(md: string): string {
  for (const block of md.split(/\n{2,}/)) {
    const line = block.trim();
    if (!line || line.startsWith("#") || line.startsWith("![") || line.startsWith("|")) continue;
    const cleaned = cleanMarkdown(line);
    if (cleaned.length > 60) return cleaned.slice(0, 320);
  }
  return cleanMarkdown(md).slice(0, 320);
}

function headings(md: string, limit: number): string[] {
  const out: string[] = [];
  for (const line of md.split("\n")) {
    const m = line.match(/^#{2,4}\s+(.+)/);
    if (m) {
      const t = cleanMarkdown(m[1]);
      if (t.length >= 4 && t.length <= 120 && !out.includes(t)) out.push(t);
    }
    if (out.length >= limit) break;
  }
  return out;
}

function classify(links: string[], baseHost: string) {
  let docs: string | undefined;
  let blog: string | undefined;
  let changelog: string | undefined;
  const related: RelatedLink[] = [];
  const seen = new Set<string>();

  for (const link of links) {
    let u: URL;
    try {
      u = new URL(link);
    } catch {
      continue;
    }
    if (u.protocol !== "https:" && u.protocol !== "http:") continue;
    const h = u.hostname.replace(/^www\./, "");
    const path = u.pathname.toLowerCase();
    const hp = `${h}${path}`;

    if (!docs && (h.startsWith("docs.") || /\/docs(\/|$)|\/documentation/.test(path))) docs = link;
    if (!changelog && /changelog|release-notes|releases|whats-new|what-s-new/.test(hp)) changelog = link;
    if (!blog && (h.startsWith("blog.") || /\/blog(\/|$)/.test(path))) blog = link;

    // related = distinct external social/official domains
    const isExternal = h !== baseHost && !h.endsWith(`.${baseHost}`) && !baseHost.endsWith(`.${h}`);
    if (isExternal) {
      const social = SOCIALS.find((s) => s.test.test(h));
      const key = social ? social.label : h;
      if (!seen.has(key) && related.length < 6) {
        seen.add(key);
        related.push({ label: social ? social.label : h, href: link });
      }
    }
  }
  return { docs, blog, changelog, related };
}

async function build(url: string): Promise<SiteEnrichment> {
  const page = await firecrawl.scrape(url);
  const baseHost = host(url);
  const { docs, blog, changelog, related } = classify(page.links, baseHost);

  const summary = page.description?.trim() || firstParagraph(page.markdown);

  // Best-effort: pull recent item titles from the changelog/blog page.
  let updates: string[] = [];
  const updatesUrl = changelog ?? blog;
  if (updatesUrl) {
    try {
      const updatesPage = await firecrawl.scrape(updatesUrl);
      updates = headings(updatesPage.markdown, 5);
    } catch {
      updates = [];
    }
  }

  return {
    url,
    title: page.title || baseHost,
    summary,
    docs,
    blog,
    changelog,
    updates,
    related,
  };
}

/** Enrich an official site. Disabled when no key; empty when no usable content. */
export async function getSiteEnrichment(
  url: string | null | undefined,
): Promise<Intel<SiteEnrichment | null>> {
  if (!url) return { status: "empty", data: null };
  return intel<SiteEnrichment | null>({
    enabled: serverEnv().has.firecrawl,
    empty: null,
    isEmpty: (v) => v == null || (!v.summary && v.related.length === 0),
    run: () => build(url),
  });
}
