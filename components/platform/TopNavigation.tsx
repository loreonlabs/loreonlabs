"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MenuIcon } from "@/components/icons";
import { CommandSearch } from "./CommandSearch";

interface TopNavigationProps {
  /** Section label shown next to the logo, e.g. "Platform" or "Docs". */
  section: string;
  /** Cross-links to the other top-level areas. */
  links: { label: string; href: string }[];
  onMenuClick: () => void;
}

/**
 * Top navigation bar shared by the product platform and documentation shells.
 * Holds the logo, section label, cross-area links, and the mobile menu toggle.
 */
export function TopNavigation({ section, links, onMenuClick }: TopNavigationProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-foreground lg:hidden"
        >
          <MenuIcon width={18} height={18} />
        </button>

        <div className="flex shrink-0 items-center gap-2.5">
          <Logo size={34} withWordmark={false} />
          <div className="hidden items-center gap-2 sm:flex">
            <span className="font-display text-sm font-semibold tracking-tight text-foreground">
              Loreon<span className="text-muted">Labs</span>
            </span>
            <span className="hidden rounded-md border border-border/70 bg-surface px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted md:inline">
              {section}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 justify-center px-2">
          <CommandSearch />
        </div>

        <nav className="flex shrink-0 items-center gap-1">
          {links.map((link) => {
            // Cross-zone links are absolute (different subdomain) → full nav.
            const isExternal = /^https?:\/\//.test(link.href);
            const className =
              "rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground";
            return isExternal ? (
              <a key={link.href} href={link.href} className={className}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={className}>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
