import "server-only";

import { serverEnv } from "@/lib/env";
import { httpJson, runService } from "./core";
import type { ServiceResponse } from "./types";

/**
 * GitHub — repositories, founders/operators (users), developer activity,
 * commits, stars, and contributors.
 *
 * Works unauthenticated (low rate limit); GITHUB_TOKEN raises the limit and is
 * applied automatically when present.
 */

const BASE = "https://api.github.com";
const TTL = 10 * 60 * 1000; // 10 minutes

export interface Repository {
  fullName: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  topics: string[];
  pushedAt: string;
}

export interface Developer {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  url: string;
  followers: number;
  publicRepos: number;
  company: string | null;
}

export interface Contributor {
  login: string;
  avatarUrl: string;
  url: string;
  contributions: number;
}

export interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

function headers(): Record<string, string> {
  const { githubToken } = serverEnv();
  return {
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
    ...(githubToken ? { authorization: `Bearer ${githubToken}` } : {}),
  };
}

/* --------------------------- repositories -------------------------- */

interface RawRepo {
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics?: string[];
  pushed_at: string;
}

function mapRepo(r: RawRepo): Repository {
  return {
    fullName: r.full_name,
    description: r.description ?? "",
    url: r.html_url,
    stars: r.stargazers_count,
    forks: r.forks_count,
    openIssues: r.open_issues_count,
    language: r.language,
    topics: r.topics ?? [],
    pushedAt: r.pushed_at,
  };
}

export function getRepository(
  owner: string,
  repo: string,
): Promise<ServiceResponse<Repository | null>> {
  return runService<Repository | null>({
    enabled: true,
    cacheKey: `gh:repo:${owner}/${repo}`,
    ttlMs: TTL,
    fallback: null,
    fetcher: async () => {
      const raw = await httpJson<RawRepo>(`${BASE}/repos/${owner}/${repo}`, {
        headers: headers(),
        revalidate: 600,
      });
      return mapRepo(raw);
    },
    isEmpty: (v) => v == null,
  });
}

export function searchRepositories(
  query: string,
  perPage = 10,
): Promise<ServiceResponse<Repository[]>> {
  const params = new URLSearchParams({
    q: query,
    sort: "stars",
    order: "desc",
    per_page: String(perPage),
  });
  return runService({
    enabled: true,
    cacheKey: `gh:search:${params}`,
    ttlMs: TTL,
    fallback: [] as Repository[],
    fetcher: async () => {
      const raw = await httpJson<{ items?: RawRepo[] }>(
        `${BASE}/search/repositories?${params}`,
        { headers: headers(), revalidate: 600 },
      );
      return (raw.items ?? []).map(mapRepo);
    },
  });
}

/* ----------------------------- founders ---------------------------- */

interface RawUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  public_repos: number;
  company: string | null;
}

export function getDeveloper(
  username: string,
): Promise<ServiceResponse<Developer | null>> {
  return runService<Developer | null>({
    enabled: true,
    cacheKey: `gh:user:${username}`,
    ttlMs: TTL,
    fallback: null,
    fetcher: async () => {
      const u = await httpJson<RawUser>(`${BASE}/users/${username}`, {
        headers: headers(),
        revalidate: 600,
      });
      return {
        login: u.login,
        name: u.name,
        bio: u.bio,
        avatarUrl: u.avatar_url,
        url: u.html_url,
        followers: u.followers,
        publicRepos: u.public_repos,
        company: u.company,
      };
    },
    isEmpty: (v) => v == null,
  });
}

/* --------------------------- contributors -------------------------- */

interface RawContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export function getContributors(
  owner: string,
  repo: string,
  perPage = 10,
): Promise<ServiceResponse<Contributor[]>> {
  return runService({
    enabled: true,
    cacheKey: `gh:contributors:${owner}/${repo}:${perPage}`,
    ttlMs: TTL,
    fallback: [] as Contributor[],
    fetcher: async () => {
      const raw = await httpJson<RawContributor[]>(
        `${BASE}/repos/${owner}/${repo}/contributors?per_page=${perPage}`,
        { headers: headers(), revalidate: 600 },
      );
      return raw.map((c) => ({
        login: c.login,
        avatarUrl: c.avatar_url,
        url: c.html_url,
        contributions: c.contributions,
      }));
    },
  });
}

/* ------------------------------ commits ---------------------------- */

interface RawCommit {
  sha: string;
  html_url: string;
  commit: { message: string; author?: { name?: string; date?: string } };
}

export function getCommits(
  owner: string,
  repo: string,
  perPage = 10,
): Promise<ServiceResponse<Commit[]>> {
  return runService({
    enabled: true,
    cacheKey: `gh:commits:${owner}/${repo}:${perPage}`,
    ttlMs: TTL,
    fallback: [] as Commit[],
    fetcher: async () => {
      const raw = await httpJson<RawCommit[]>(
        `${BASE}/repos/${owner}/${repo}/commits?per_page=${perPage}`,
        { headers: headers(), revalidate: 600 },
      );
      return raw.map((c) => ({
        sha: c.sha.slice(0, 7),
        message: c.commit.message.split("\n")[0],
        author: c.commit.author?.name ?? "unknown",
        date: c.commit.author?.date ?? "",
        url: c.html_url,
      }));
    },
  });
}
