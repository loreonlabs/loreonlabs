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

/** Product platform navigation (/app). */
export const appNav: NavGroup[] = [
  {
    items: [
      {
        label: "Overview",
        href: "/app",
        description: "Platform home and today's signals",
        icon: "grid",
      },
      {
        label: "Discovery",
        href: "/app/discovery",
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
        href: "/app/narratives",
        description: "Track growing narratives",
        icon: "pulse",
      },
      {
        label: "Founders",
        href: "/app/founders",
        description: "Monitor founders and operators",
        icon: "user",
      },
      {
        label: "Projects",
        href: "/app/projects",
        description: "Discover emerging projects",
        icon: "compass",
      },
      {
        label: "Ecosystems",
        href: "/app/ecosystems",
        description: "Explore ecosystems",
        icon: "layers",
      },
      {
        label: "Markets",
        href: "/app/markets",
        description: "Monitor market attention",
        icon: "chart",
      },
    ],
  },
  {
    items: [
      {
        label: "Search",
        href: "/app/search",
        description: "Unified search",
        icon: "search",
      },
    ],
  },
];

/** Documentation navigation (/docs). */
export const docsNav: NavGroup[] = [
  {
    label: "Introduction",
    items: [
      {
        label: "Overview",
        href: "/docs",
        description: "Documentation home",
        icon: "book",
      },
      {
        label: "What is Loreon",
        href: "/docs/what-is-loreon",
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
        href: "/docs/methodology",
        description: "From raw signal to intelligence",
        icon: "network",
      },
      {
        label: "Data Sources",
        href: "/docs/data-sources",
        description: "Where signals come from",
        icon: "layers",
      },
      {
        label: "Attention Score",
        href: "/docs/attention-score",
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
        href: "/docs/faq",
        description: "Common questions",
        icon: "book",
      },
      {
        label: "Future Development",
        href: "/docs/future-development",
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
