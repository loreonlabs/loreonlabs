"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, CloseIcon } from "@/components/icons";

/**
 * Global command-palette search (⌘K / Ctrl+K). Live type-ahead against
 * /api/search with debouncing, suggestions, recent searches, and keyboard
 * navigation. Results are real and clickable.
 */

type SearchType = "project" | "founder" | "market" | "narrative" | "ecosystem";

interface SearchResult {
  id: string;
  type: SearchType;
  title: string;
  subtitle: string;
  href: string;
  image?: string;
}

const TYPE_LABEL: Record<SearchType, string> = {
  project: "Project",
  founder: "Founder",
  market: "Market",
  narrative: "Narrative",
  ecosystem: "Ecosystem",
};

const SUGGESTIONS = ["ethereum", "solana", "AI agents", "uniswap", "base", "DeFi"];
const RECENT_KEY = "loreon:recent-searches";

export function CommandSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open/close via keyboard.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 20);
      try {
        setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"));
      } catch {
        setRecent([]);
      }
    } else {
      setQuery("");
      setResults([]);
      setActive(0);
    }
  }, [open]);

  // Debounced live search.
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: ctrl.signal,
        });
        const json = await res.json();
        setResults(json.results ?? []);
        setActive(0);
      } catch {
        /* aborted or failed — keep prior results */
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query]);

  const saveRecent = useCallback((term: string) => {
    const t = term.trim();
    if (!t) return;
    try {
      const prev: string[] = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      const next = [t, ...prev.filter((x) => x !== t)].slice(0, 6);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const go = useCallback(
    (r: SearchResult) => {
      saveRecent(query);
      setOpen(false);
      router.push(r.href);
    },
    [query, router, saveRecent],
  );

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex w-full max-w-xs items-center gap-2 rounded-lg border border-border bg-surface/50 px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/40"
      >
        <SearchIcon width={15} height={15} />
        <span className="flex-1 text-left">Search…</span>
        <kbd className="hidden rounded border border-border/70 bg-background/60 px-1.5 py-0.5 font-mono text-[10px] sm:inline">
          ⌘K
        </kbd>
      </button>

      {/* Palette */}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[12vh]">
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          />
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3">
              <SearchIcon width={18} height={18} className="text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, founders, markets, narratives, ecosystems…"
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted/70 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-muted hover:text-foreground"
                aria-label="Close"
              >
                <CloseIcon width={16} height={16} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.trim().length < 2 ? (
                <div className="p-2">
                  {recent.length > 0 && (
                    <>
                      <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted/70">
                        Recent
                      </p>
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {recent.map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setQuery(r)}
                            className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs text-muted hover:text-foreground"
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted/70">
                    Suggested
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQuery(s)}
                        className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs text-muted hover:text-foreground"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : loading && results.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted">Searching…</p>
              ) : results.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted">
                  No results for “{query}”.
                </p>
              ) : (
                <ul>
                  {results.map((r, i) => (
                    <li key={r.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(r)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                          i === active ? "bg-accent/10" : "hover:bg-background/60"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {r.image ? (
                          <img
                            src={r.image}
                            alt=""
                            width={20}
                            height={20}
                            className="h-5 w-5 rounded-full"
                          />
                        ) : (
                          <span className="grid h-5 w-5 place-items-center rounded bg-accent/10 text-[9px] font-semibold text-accent">
                            {r.title.slice(0, 1).toUpperCase()}
                          </span>
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-foreground">
                            {r.title}
                          </span>
                          <span className="block truncate text-[11px] text-muted">
                            {r.subtitle}
                          </span>
                        </span>
                        <span className="rounded border border-border/60 px-1.5 py-0.5 font-mono text-[9px] text-muted">
                          {TYPE_LABEL[r.type]}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
