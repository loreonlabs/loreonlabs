"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SearchIcon } from "@/components/icons";

type SearchType = "project" | "builder" | "market" | "narrative" | "ecosystem" | "launchpad";

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
  builder: "Builder",
  market: "Market",
  narrative: "Research",
  ecosystem: "Ecosystem",
  launchpad: "Launchpad",
};

const SUGGESTIONS = ["ethereum", "solana", "AI agents", "uniswap", "base", "DeFi"];

/** Full-page live search (same /api/search source as the ⌘K palette). */
export function FullSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

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
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: ctrl.signal });
        const json = await res.json();
        setResults(json.results ?? []);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query]);

  return (
    <div>
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 focus-within:border-accent/50">
        <SearchIcon width={18} height={18} className="shrink-0 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, founders, markets, narratives, ecosystems…"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted/70 focus:outline-none"
          autoFocus
        />
      </div>

      {query.trim().length < 2 ? (
        <div className="mt-6">
          <p className="t-meta uppercase tracking-wide">Suggested</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="rounded-full border border-border/70 bg-surface px-3 py-1 text-xs text-muted transition-colors hover:border-accent/40 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-2">
          {loading && results.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border/70 bg-surface p-8 text-center text-sm text-muted">
              Searching live sources…
            </p>
          ) : results.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border/70 bg-surface p-8 text-center text-sm text-muted">
              No results for “{query}”.
            </p>
          ) : (
            results.map((r) => (
              <Link
                key={r.id}
                href={r.href}
                className="group flex items-center gap-4 rounded-xl border border-border/70 bg-surface p-4 transition-colors hover:border-accent/40 hover:bg-surface-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {r.image ? (
                  <img src={r.image} alt="" width={28} height={28} className="h-7 w-7 rounded-full" />
                ) : (
                  <span className="grid h-7 w-7 place-items-center rounded bg-accent/10 text-[11px] font-semibold text-accent-ink">
                    {r.title.slice(0, 1).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">{r.title}</div>
                  <div className="truncate text-[13px] text-muted">{r.subtitle}</div>
                </div>
                <span className="rounded border border-border/60 px-1.5 py-0.5 font-mono text-[9px] text-muted">
                  {TYPE_LABEL[r.type]}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
