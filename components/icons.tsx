import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const PulseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 12h4l2 6 4-14 2 8h6" />
  </svg>
);

export const RadarIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 12 19 7" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const CompassIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </svg>
);

export const NetworkIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="6" r="2.4" />
    <circle cx="18" cy="6" r="2.4" />
    <circle cx="12" cy="18" r="2.4" />
    <path d="M7.6 7.7 10.7 16M16.4 7.7 13.3 16M8 6h8" />
  </svg>
);

export const LayersIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
);

export const SparkIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
  </svg>
);

export const UserSignalIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 4v15M6 13l6 6 6-6" />
  </svg>
);

export const GlobeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
  </svg>
);

export const GitIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="6" r="2.2" />
    <circle cx="6" cy="18" r="2.2" />
    <circle cx="17" cy="9" r="2.2" />
    <path d="M6 8.2v7.6M8 6h4a2 2 0 0 1 2 2v0M17 11.2c0 3.4-2.4 4.3-5 4.8" />
  </svg>
);

export const ChartIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 19V5M4 19h16M8 16l3-4 3 2 4-6" />
  </svg>
);

export const ForumIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 5h16v10H9l-4 4v-4H4V5Z" />
    <path d="M8 9h8M8 12h5" />
  </svg>
);

export const ShieldCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v6c0 4 3 6.5 7 8 4-1.5 7-4 7-8V6l-7-3Z" />
    <path d="m9.2 12 2 2 3.6-3.8" />
  </svg>
);

export const BoltIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const HomeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 11.5 12 4l8 7.5" />
    <path d="M6 10v9h12v-9" />
  </svg>
);

export const BookIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Z" />
    <path d="M18 16H7a2 2 0 0 0-2 2" />
  </svg>
);

export const GridIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const TrendUpIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 17 10 11l4 4 6-7" />
    <path d="M16 8h4v4" />
  </svg>
);

export const TrendDownIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7 10 13l4-4 6 7" />
    <path d="M16 16h4v-4" />
  </svg>
);

export const ExternalIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 5h5v5" />
    <path d="M19 5l-8 8" />
    <path d="M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6L12 17l-5.3 2.6 1.1-6L3.4 9.4l6-.8L12 3Z" />
  </svg>
);

export const XSocialIcon = (p: IconProps) => (
  <svg
    width={p.width ?? 16}
    height={p.height ?? 16}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={p.className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

/**
 * String-keyed icon registry. Used by navigation config so that nav items can
 * reference an icon by name (a serializable string) instead of a component
 * function — required because nav config crosses the Server → Client boundary.
 */
export type IconName =
  | "grid"
  | "radar"
  | "pulse"
  | "user"
  | "compass"
  | "layers"
  | "chart"
  | "search"
  | "book"
  | "spark"
  | "network"
  | "shield";

export const iconByName: Record<IconName, ComponentType<IconProps>> = {
  grid: GridIcon,
  radar: RadarIcon,
  pulse: PulseIcon,
  user: UserSignalIcon,
  compass: CompassIcon,
  layers: LayersIcon,
  chart: ChartIcon,
  search: SearchIcon,
  book: BookIcon,
  spark: SparkIcon,
  network: NetworkIcon,
  shield: ShieldCheck,
};
