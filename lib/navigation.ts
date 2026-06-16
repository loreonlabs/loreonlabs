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
        description: "Platform home and today's signals",
        icon: "grid",
      },
      {
        label: "Discovery",
        href: "/discovery",
        description: "Find emerging opportunities",
        icon: "radar",
      },
    ],
  },
  {
    label: "Intelligence",
    items: [
      {
        label: "Narratives",
        href: "/narratives",
        description: "Track growing narratives",
        icon: "pulse",
      },
      {
        label: "Founders",
        href: "/founders",
        description: "Monitor founders and operators",
        icon: "user",
      },
      {
        label: "Projects",
        href: "/projects",
        description: "Discover emerging projects",
        icon: "compass",
      },
      {
        label: "Ecosystems",
        href: "/ecosystems",
        description: "Explore ecosystems",
        icon: "layers",
      },
      {
        label: "Markets",
        href: "/markets",
        description: "Monitor market attention",
        icon: "chart",
      },
    ],
  },
  {
    items: [
      {
        label: "Search",
        href: "/search",
        description: "Unified search",
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
    label: "How it works",
    items: [
      {
        label: "Methodology",
        href: "/methodology",
        description: "From raw signal to intelligence",
        icon: "network",
      },
      {
        label: "Data Sources",
        href: "/data-sources",
        description: "Where signals come from",
        icon: "layers",
      },
      {
        label: "Attention Score",
        href: "/attention-score",
        description: "How scoring works",
        icon: "shield",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "FAQ",
        href: "/faq",
        description: "Common questions",
        icon: "book",
      },
      {
        label: "Future Development",
        href: "/future-development",
        description: "Where Loreon is heading",
        icon: "spark",
      },
    ],
  },
];

/** Flat ordered list of doc pages, used for prev/next navigation. */
export const docsOrder: { label: string; href: string }[] = docsNav
  .flatMap((g) => g.items)
  .map(({ label, href }) => ({ label, href }));
