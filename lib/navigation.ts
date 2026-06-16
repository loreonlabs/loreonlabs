import type { IconName } from "@/components/icons";

export interface NavItem {
  label: string;
  href: string;
  description: string;
  /** Icon registry key — resolved to a component via `iconByName`. */
  icon: IconName;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

/**
 * Product platform navigation. Hrefs are zone-relative to the app root so they
 * stay clean on app.loreonlabs.xyz (middleware rewrites them under /app).
 */
export const appNav: NavGroup[] = [
  {
    items: [
      {
        label: "Overview",
        href: "/",
        description: "Today's signals across the platform",
        icon: "grid",
      },
    ],
  },
  {
    label: "Intelligence",
    items: [
      {
        label: "Markets",
        href: "/markets",
        description: "Live token and market data",
        icon: "chart",
      },
      {
        label: "Builders",
        href: "/builders",
        description: "The people building onchain",
        icon: "user",
      },
      {
        label: "Research",
        href: "/research",
        description: "Narratives backed by real coverage",
        icon: "pulse",
      },
      {
        label: "Ecosystems",
        href: "/ecosystems",
        description: "Explore ecosystems",
        icon: "layers",
      },
      {
        label: "Launchpads",
        href: "/launchpads",
        description: "The launchpad layer",
        icon: "spark",
      },
    ],
  },
  {
    items: [
      {
        label: "Search",
        href: "/search",
        description: "Search everything",
        icon: "search",
      },
    ],
  },
];

/**
 * Documentation navigation. Hrefs are zone-relative to the docs root so they
 * stay clean on docs.loreonlabs.xyz (middleware rewrites them under /docs).
 */
export const docsNav: NavGroup[] = [
  {
    label: "Introduction",
    items: [
      {
        label: "Overview",
        href: "/",
        description: "Documentation home",
        icon: "book",
      },
      {
        label: "What is Loreon",
        href: "/what-is-loreon",
        description: "The platform and why it exists",
        icon: "spark",
      },
    ],
  },
  {
    label: "Platform",
    items: [
      { label: "Methodology", href: "/methodology", description: "From raw signal to intelligence", icon: "network" },
      { label: "Attention Engine", href: "/attention-engine", description: "How attention is computed", icon: "spark" },
      { label: "Attention Score", href: "/attention-score", description: "How scoring works", icon: "shield" },
    ],
  },
  {
    label: "Discovery",
    items: [
      { label: "Builder Discovery", href: "/builder-discovery", description: "How builders are found", icon: "user" },
      { label: "Ecosystem Discovery", href: "/ecosystem-discovery", description: "How ecosystems are tracked", icon: "layers" },
      { label: "Launchpad Tracking", href: "/launchpad-tracking", description: "How launchpads are tracked", icon: "radar" },
    ],
  },
  {
    label: "Ranking",
    items: [
      { label: "Builder Ranking", href: "/builder-ranking", description: "Builder leaderboard metrics", icon: "user" },
      { label: "Market Ranking", href: "/market-ranking", description: "How markets are ranked", icon: "chart" },
      { label: "Research Ranking", href: "/research-ranking", description: "How narratives are ranked", icon: "pulse" },
      { label: "Ecosystem Ranking", href: "/ecosystem-ranking", description: "How ecosystems are ranked", icon: "layers" },
    ],
  },
  {
    label: "Methodology",
    items: [
      { label: "Narrative Methodology", href: "/narrative-methodology", description: "Clustering real coverage", icon: "pulse" },
      { label: "Builder Methodology", href: "/builder-methodology", description: "Profiling real people", icon: "user" },
      { label: "Ecosystem Methodology", href: "/ecosystem-methodology", description: "Aggregating ecosystems", icon: "layers" },
      { label: "Market Methodology", href: "/market-methodology", description: "Market data sourcing", icon: "chart" },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Data Freshness", href: "/data-freshness", description: "Caching and refresh", icon: "shield" },
      { label: "Source Validation", href: "/source-validation", description: "Trust and provenance", icon: "shield" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "FAQ", href: "/faq", description: "Common questions", icon: "book" },
      { label: "Future Development", href: "/future-development", description: "Where Loreon is heading", icon: "spark" },
    ],
  },
];

/** Flat ordered list of doc pages, used for prev/next navigation. */
export const docsOrder: { label: string; href: string }[] = docsNav
  .flatMap((g) => g.items)
  .map(({ label, href }) => ({ label, href }));
