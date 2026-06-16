"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { iconByName } from "@/components/icons";
import type { NavGroup } from "@/lib/navigation";

interface SidebarProps {
  groups: NavGroup[];
  /** Called when a link is activated (used to close the mobile drawer). */
  onNavigate?: () => void;
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/app" || href === "/docs") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Configurable navigation sidebar shared by the product platform and docs.
 * Highlights the active route based on the current pathname.
 */
export function Sidebar({ groups, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6 p-4">
      {groups.map((group, gi) => (
        <div key={group.label ?? gi}>
          {group.label && (
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted/70">
              {group.label}
            </p>
          )}
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = iconByName[item.icon];
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-accent/10 font-medium text-foreground"
                        : "text-muted hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    <Icon
                      width={16}
                      height={16}
                      className={active ? "text-accent" : "text-muted group-hover:text-foreground"}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
