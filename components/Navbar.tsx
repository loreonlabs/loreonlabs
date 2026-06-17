"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { navLinks, site, type NavLink } from "@/lib/site";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const DESKTOP_ITEM =
  "rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground";
const MOBILE_ITEM =
  "block w-full rounded-lg px-3 py-3 text-left text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth-scroll to a section by id — no hash is ever written to the URL.
  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Activate an in-page item. When the mobile menu is open we close it first
  // and defer the scroll past its collapse animation — otherwise the menu's
  // reflow cancels the in-flight smooth scroll (notably on iOS Safari).
  const goToSection = (id: string) => {
    if (open) {
      setOpen(false);
      window.setTimeout(() => scrollToSection(id), 280);
    } else {
      scrollToSection(id);
    }
  };

  // One handler for desktop + mobile: in-page items scroll, cross-zone items
  // navigate. The mobile menu always closes on activation.
  const renderItem = (link: NavLink, className: string) => {
    if ("target" in link) {
      return (
        <button
          key={link.label}
          type="button"
          onClick={() => goToSection(link.target)}
          className={className}
        >
          {link.label}
        </button>
      );
    }
    return (
      <a
        key={link.label}
        href={link.href}
        onClick={() => setOpen(false)}
        className={className}
      >
        {link.label}
      </a>
    );
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-page">
        <div
          className={`mt-3 flex items-center justify-between rounded-2xl border px-3 py-2.5 transition-all duration-300 sm:px-4 ${
            scrolled
              ? "border-border/80 bg-background/80 shadow-card backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <Logo size={36} />

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => renderItem(link, DESKTOP_ITEM))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.appUrl}
              className="btn-primary hidden px-4 py-2 text-[13px] sm:inline-flex"
            >
              Open App
              <ArrowIcon />
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-foreground md:hidden"
            >
              <span className="relative block h-3.5 w-4">
                <span
                  className={`absolute left-0 block h-0.5 w-4 bg-current transition-all ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-current transition-all ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-4 bg-current transition-all ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-2 overflow-hidden rounded-2xl border border-border/80 bg-background/90 p-2 backdrop-blur-xl md:hidden"
            >
              {navLinks.map((link) => renderItem(link, MOBILE_ITEM))}
              <a
                href={site.appUrl}
                className="btn-primary mt-2 w-full"
                onClick={() => setOpen(false)}
              >
                Open App
                <ArrowIcon />
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
