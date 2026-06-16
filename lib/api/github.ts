import "server-only";

import { serverEnv } from "@/lib/env";
import { httpJson, withCache, health, type ApiHealth } from "./client";

/**
 * GitHub — repositories, founders/users, developer activity, commits, stars,
 * and contributors. Uses GITHUB_TOKEN when present (raised rate limit); works
 * unauthenticated otherwise. Never hardcodes the token.
 */

const BASE = "https://api.github.com";
const TTL = 10 * 60 * 1000;

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

export function getRepository(owner: string, repo: string): Promise<Repository> {
  return withCache(`gh:repo:${owner}/${repo}`, TTL, async () => {
    const raw = await httpJson<RawRepo>(`${BASE}/repos/${owner}/${repo}`, {
      headers: headers(),
    });
    return mapRepo(raw);
  });
}

export function searchRepositories(query: string, perPage = 10): Promise<Repository[]> {
  const params = new URLSearchParams({
    q: query,
    sort: "stars",
    order: "desc",
    per_page: String(perPage),
  });
  return withCache(`gh:search:${params}`, TTL, async () => {
    const raw = await httpJson<{ items?: RawRepo[] }>(
      `${BASE}/search/repositories?${params}`,
      { headers: headers() },
    );
    return (raw.items ?? []).map(mapRepo);
  });
}

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

/** A founder / operator profile. */
export function getUser(username: string): Promise<Developer> {
  return withCache(`gh:user:${username}`, TTL, async () => {
    const u = await httpJson<RawUser>(`${BASE}/users/${username}`, {
      headers: headers(),
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
  });
}

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
): Promise<Contributor[]> {
  return withCache(`gh:contributors:${owner}/${repo}:${perPage}`, TTL, async () => {
    const raw = await httpJson<RawContributor[]>(
      `${BASE}/repos/${owner}/${repo}/contributors?per_page=${perPage}`,
      { headers: headers() },
    );
    return raw.map((c) => ({
      login: c.login,
      avatarUrl: c.avatar_url,
      url: c.html_url,
      contributions: c.contributions,
    }));
  });
}

interface RawCommit {
  sha: string;
  html_url: string;
  commit: { message: string; author?: { name?: string; date?: string } };
}

export function getCommits(
  owner: string,
  repo: string,
  perPage = 10,
): Promise<Commit[]> {
  return withCache(`gh:commits:${owner}/${repo}:${perPage}`, TTL, async () => {
    const raw = await httpJson<RawCommit[]>(
      `${BASE}/repos/${owner}/${repo}/commits?per_page=${perPage}`,
      { headers: headers() },
    );
    return raw.map((c) => ({
      sha: c.sha.slice(0, 7),
      message: c.commit.message.split("\n")[0],
      author: c.commit.author?.name ?? "unknown",
      date: c.commit.author?.date ?? "",
      url: c.html_url,
    }));
  });
}

/** Verify the GitHub token works (and report core rate limit). */
export function testGitHub(): Promise<ApiHealth> {
  return health(async () => {
    const data = await httpJson<{ resources?: { core?: { remaining?: number; limit?: number } } }>(
      `${BASE}/rate_limit`,
      { headers: headers() },
    );
    const core = data.resources?.core;
    const authed = serverEnv().has.github ? "token" : "anon";
    return core
      ? `${authed}: ${core.remaining}/${core.limit} core remaining`
      : `${authed}: ok`;
  });
}
