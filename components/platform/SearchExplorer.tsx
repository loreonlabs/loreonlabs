"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/States";
import { SearchIcon } from "@/components/icons";
import type { SearchResult, SearchType } from "@/lib/intel/search";

const GROUPS: { type: SearchType; label: string }[] = [
  { type: "narrative", label: "Narratives" },
  { type: "market", label: "Markets" },
  { type: "project", label: "Projects" },
  { type: "builder", label: "Builders" },
  { type: "ecosystem", label: "Ecosystems" },
  { type: "launchpad", label: "Launchpads" },
  { type: "source", label: "Sources" },
];

export function SearchExplorer() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setTouched(true);
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: ctrl.signal,
        });
        const json = (await res.json()) as { results?: SearchResult[] };
        setResults(json.results ?? []);
      } catch {
        /* aborted or failed — keep last results */
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query]);

  const grouped = useMemo(() => {
    return GROUPS.map((g) => ({
      ...g,
      items: results.filter((r) => r.type === g.type),
    })).filter((g) => g.items.length > 0);
  }, [results]);

  const hasQuery = query.trim().length >= 2;

  return (
    <div>
      {/* search field */}
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
          <SearchIcon width={18} height={18} />
        </span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setQuery("");
          }}
          placeholder="Search narratives, markets, projects, builders, ecosystems, sources…"
          aria-label="Search Loreon intelligence"
          className="w-full rounded-2xl border border-border bg-surface py-3.5 pl-12 pr-4 text-sm text-foreground shadow-card outline-none transition-colors placeholder:text-muted focus:border-accent/50"
        />
        {loading && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            <span className="block h-4 w-4 animate-spin rounded-full border-2 border-border border-t-accent" />
          </span>
        )}
      </div>

      {/* states */}
      <div className="mt-8">
        {!hasQuery ? (
          <EmptyState
            icon={<SearchIcon width={20} height={20} />}
            title="Search the entire intelligence layer."
            message="Type a narrative, market, project, builder, ecosystem, or source. Results are grouped by type and link straight to the detail."
          />
        ) : loading && results.length === 0 ? (
          <SearchSkeleton />
        ) : grouped.length === 0 && touched ? (
          <EmptyState
            title="No matching intelligence found yet."
            message="Try a broader narrative or ecosystem — Loreon only surfaces what it can corroborate from real sources."
          />
        ) : (
          <div className="space-y-8">
            {grouped.map((g) => (
              <section key={g.type}>
                <div className="mb-3 flex items-center gap-2">
                  <h2 className="t-section-title">{g.label}</h2>
                  <span className="font-mono text-[11px] text-muted">{g.items.length}</span>
                </div>
                <div className="card-grid-2">
                  {g.items.map((r) => (
                    <Link
                      key={r.id}
                      href={r.href}
                      className="group flex items-center gap-3 rounded-xl border border-border/70 bg-surface p-3.5 shadow-card transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-2"
                    >
                      {r.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={r.image} alt="" width={32} height={32} className="h-8 w-8 rounded-full" />
                      ) : (
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/10 text-[11px] font-semibold uppercase text-accent-ink">
                          {r.title.slice(0, 1)}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-foreground">{r.title}</div>
                        <div className="truncate text-[11px] text-muted">{r.subtitle}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="space-y-3" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-16 animate-pulse rounded-xl border border-border/60 bg-surface" />
      ))}
    </div>
  );
}
