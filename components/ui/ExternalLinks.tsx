import type { ComponentType, SVGProps } from "react";
import {
  GlobeIcon,
  GitIcon,
  XSocialIcon,
  ChartIcon,
  BookIcon,
  ExternalIcon,
} from "@/components/icons";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const ICONS: Record<string, IconType> = {
  website: GlobeIcon,
  github: GitIcon,
  twitter: XSocialIcon,
  coingecko: ChartIcon,
  docs: BookIcon,
  external: ExternalIcon,
};

export interface ExternalLinkSpec {
  kind: keyof typeof ICONS;
  label: string;
  href: string;
}

/** A row of real external-link chips (website, github, x, coingecko, docs). */
export function ExternalLinks({ links }: { links: ExternalLinkSpec[] }) {
  const valid = links.filter((l) => l.href);
  if (valid.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {valid.map((l) => {
        const Icon = ICONS[l.kind] ?? ICONS.external;
        return (
          <a
            key={l.kind + l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-surface/60 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-foreground"
          >
            <Icon width={14} height={14} />
            {l.label}
          </a>
        );
      })}
    </div>
  );
}
