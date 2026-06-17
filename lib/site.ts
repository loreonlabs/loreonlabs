import { ROOT_DOMAIN, zoneUrls } from "./urls";

export const site = {
  name: "LoreonLabs",
  domain: ROOT_DOMAIN,
  url: zoneUrls.landing,
  tagline: "Discover what gains attention before consensus.",
  description:
    "LoreonLabs tracks emerging narratives, founders, projects, and market signals across crypto, AI, and technology — an intelligence and discovery platform for what gains attention before consensus.",
  // Cross-zone destinations — absolute subdomain URLs (see lib/urls.ts).
  appUrl: zoneUrls.app,
  docsUrl: zoneUrls.docs,
  twitterUrl: "https://x.com/loreonlabs",
};

/**
 * Landing navigation. In-page items use `target` (a section id we scroll to,
 * never a hash href) so the URL stays clean; cross-zone items use `href`.
 */
export type NavLink =
  | { label: string; target: string }
  | { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Features", target: "features" },
  { label: "Methodology", target: "methodology" },
  { label: "Docs", href: site.docsUrl },
];
