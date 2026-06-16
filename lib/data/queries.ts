import { narratives } from "./narratives";
import { founders } from "./founders";
import { projects } from "./projects";
import { ecosystems } from "./ecosystems";
import type { SearchResult } from "@/lib/types";

/* ---------------------------------------------------------------- *
 * Single-entity lookups by slug (slug === id)
 * ---------------------------------------------------------------- */
export const getNarrative = (slug: string) =>
  narratives.find((n) => n.id === slug);
export const getFounder = (slug: string) => founders.find((f) => f.id === slug);
export const getProject = (slug: string) => projects.find((p) => p.id === slug);
export const getEcosystem = (slug: string) =>
  ecosystems.find((e) => e.id === slug);

/* ---------------------------------------------------------------- *
 * Cross-references
 * ---------------------------------------------------------------- */
export const narrativesByEcosystem = (name: string) =>
  narratives.filter((n) => n.ecosystems.includes(name));

export const projectsByEcosystem = (name: string) =>
  projects.filter((p) => p.ecosystem === name);

export const foundersByEcosystem = (name: string) =>
  founders.filter((f) => f.ecosystems.includes(name));

export const projectsByIds = (ids: string[]) =>
  projects.filter((p) => ids.includes(p.id));

export const narrativesByIds = (ids: string[]) =>
  narratives.filter((n) => ids.includes(n.id));

export const foundersByProject = (projectId: string) =>
  founders.filter((f) => f.projectIds.includes(projectId));

export const projectsByNarrative = (narrativeId: string) =>
  projects.filter((p) => p.narrativeIds.includes(narrativeId));

/* ---------------------------------------------------------------- *
 * Unified search index — derived from real data (no API).
 * ---------------------------------------------------------------- */
export const searchIndex: SearchResult[] = [
  ...narratives.map((n) => ({
    id: `narrative-${n.id}`,
    title: n.name,
    type: "narrative" as const,
    description: n.summary,
    href: `/narratives/${n.id}`,
  })),
  ...projects.map((p) => ({
    id: `project-${p.id}`,
    title: p.name,
    type: "project" as const,
    description: p.summary,
    href: `/projects/${p.id}`,
  })),
  ...founders.map((f) => ({
    id: `founder-${f.id}`,
    title: `${f.name} (${f.handle})`,
    type: "founder" as const,
    description: f.focus,
    href: `/founders/${f.id}`,
  })),
  ...ecosystems.map((e) => ({
    id: `ecosystem-${e.id}`,
    title: e.name,
    type: "ecosystem" as const,
    description: e.description,
    href: `/ecosystems/${e.id}`,
  })),
];
