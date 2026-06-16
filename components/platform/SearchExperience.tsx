"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { SearchIcon, ArrowRight } from "@/components/icons";
import { searchIndex, searchSuggestions, searchScopes } from "@/lib/data";
import { typeLabel } from "@/lib/format";
import type { SearchResultType } from "@/lib/types";

/**
 * Unified search experience. Filters the real search index (built from
 * narratives, projects, founders, and ecosystems) entirely client-side —
 * no API is connected in this phase. Each result links to its detail page.
 */
export function SearchExperience() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<SearchResultType | "all">("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return searchIndex.filter((r) => {
      const matchesScope = scope === "all" || r.type === scope;
      const matchesQuery =
        q.length === 0 ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q);
      return matchesScope && matchesQuery;
    });
  }, [query, scope]);

  return (
    <div>
      {/* Search input */}
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 px-4 py-3 focus-within:border-accent/50">
        <SearchIcon width={18} height={18} className="shrink-0 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search narratives, projects, founders, ecosystems…"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted/70 focus:outline-none"
          aria-label="Search"
          autoFocus
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-[11px] font-medium text-muted hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      {/* Scope filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setScope("all")}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
            scope === "all"
              ? "border-accent/40 bg-accent/10 text-foreground"
              : "border-border bg-surface/40 text-muted hover:text-foreground"
          }`}
        >
          All
        </button>
        {searchScopes.map((s) => (
          <button
            key={s.type}
            type="button"
            onClick={() => setScope(s.type)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              scope === s.type
                ? "border-accent/40 bg-accent/10 text-foreground"
                : "border-border bg-surface/40 text-muted hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Suggestions (shown when no query) */}
      {query.length === 0 && (
        <div className="mt-6">
          <p className="t-meta uppercase tracking-wide">Suggested</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {searchSuggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="rounded-full border border-border/70 bg-surface/40 px-3 py-1 text-xs text-muted transition-colors hover:border-accent/40 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result count */}
      <p className="mt-6 t-meta">
        {results.length} result{results.length === 1 ? "" : "s"}
        {scope !== "all" ? ` in ${scope}s` : ""}
      </p>

      {/* Results */}
      <div className="mt-3 space-y-2">
        {results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/70 bg-surface/30 p-8 text-center text-sm text-muted">
            No results for “{query}”. Try a different term or scope.
          </div>
        ) : (
          results.map((r) => (
            <Link
              key={r.id}
              href={r.href}
              className="group flex items-center gap-4 rounded-xl border border-border/70 bg-surface/50 p-4 transition-colors hover:border-accent/40 hover:bg-surface"
            >
              <Badge tone="accent">{typeLabel(r.type)}</Badge>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-foreground">{r.title}</div>
                <div className="truncate text-[13px] text-muted">{r.description}</div>
              </div>
              <ArrowRight
                width={16}
                height={16}
                className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
