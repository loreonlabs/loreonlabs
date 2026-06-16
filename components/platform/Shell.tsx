"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Sidebar } from "./Sidebar";
import { TopNavigation } from "./TopNavigation";
import { Logo } from "@/components/Logo";
import { CloseIcon } from "@/components/icons";
import type { NavGroup } from "@/lib/navigation";

interface ShellProps {
  section: string;
  groups: NavGroup[];
  /** Cross-area links shown in the top navigation. */
  links: { label: string; href: string }[];
  children: ReactNode;
}

/**
 * Responsive application shell: fixed sidebar on desktop, slide-over drawer on
 * mobile, plus the shared top navigation. Used by both /app and /docs layouts.
 */
export function Shell({ section, groups, links, children }: ShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <TopNavigation section={section} links={links} onMenuClick={() => setOpen(true)} />

      <div className="mx-auto flex w-full max-w-[1400px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border/70 lg:block">
          <Sidebar groups={groups} />
        </aside>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            />
            <div className="absolute left-0 top-0 h-full w-72 max-w-[80%] overflow-y-auto border-r border-border bg-background">
              <div className="flex h-14 items-center justify-between border-b border-border/70 px-4">
                <Logo size={28} />
                <button
                  type="button"
                  aria-label="Close navigation"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface/60 text-foreground"
                >
                  <CloseIcon width={18} height={18} />
                </button>
              </div>
              <Sidebar groups={groups} onNavigate={() => setOpen(false)} />
              <div className="border-t border-border/70 p-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div className="platform-container">{children}</div>
        </main>
      </div>
    </div>
  );
}
