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
  homepage: string | null;
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
  website: string | null;
  twitter: string | null;
  location: string | null;
  createdAt: string;
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
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics?: string[];
  pushed_at: string;
}

function mapRepo(r: RawRepo): Repository {
  const homepage = r.homepage?.trim();
  return {
    fullName: r.full_name,
    description: r.description ?? "",
    url: r.html_url,
    homepage: homepage
      ? /^https?:\/\//i.test(homepage)
        ? homepage
        : `https://${homepage}`
      : null,
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
      revalidate: 86400,
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
      { headers: headers(), revalidate: 86400 },
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
  blog: string | null;
  twitter_username: string | null;
  location: string | null;
  created_at: string;
}

function normalizeUrl(value: string | null): string | null {
  if (!value) return null;
  const v = value.trim();
  if (!v) return null;
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

/** A founder / operator / builder profile. */
export function getUser(username: string): Promise<Developer> {
  return withCache(`gh:user:${username}`, TTL, async () => {
    const u = await httpJson<RawUser>(`${BASE}/users/${username}`, {
      headers: headers(),
      revalidate: 86400,
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
      website: normalizeUrl(u.blog),
      twitter: u.twitter_username,
      location: u.location,
      createdAt: u.created_at ?? "",
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
      { headers: headers(), revalidate: 86400 },
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
      { headers: headers(), revalidate: 86400 },
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

/** Repos owned by a user, most recently pushed first. */
export function listUserRepos(login: string, perPage = 6): Promise<Repository[]> {
  return withCache(`gh:userrepos:${login}:${perPage}`, TTL, async () => {
    const raw = await httpJson<RawRepo[]>(
      `${BASE}/users/${login}/repos?sort=pushed&per_page=${perPage}&type=owner`,
      { headers: headers(), revalidate: 86400 },
    );
    return raw.map(mapRepo);
  });
}

export interface UserHit {
  login: string;
  avatarUrl: string;
  url: string;
}

/** Search users (for global search). */
export function searchUsers(query: string, perPage = 8): Promise<UserHit[]> {
  const params = new URLSearchParams({ q: query, per_page: String(perPage) });
  return withCache(`gh:usersearch:${params}`, TTL, async () => {
    const raw = await httpJson<{ items?: Array<{ login: string; avatar_url: string; html_url: string; type?: string }> }>(
      `${BASE}/search/users?${params}`,
      { headers: headers(), revalidate: 86400 },
    );
    return (raw.items ?? [])
      .filter((u) => u.type !== "Organization")
      .map((u) => ({ login: u.login, avatarUrl: u.avatar_url, url: u.html_url }));
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
