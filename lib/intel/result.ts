import "server-only";

/**
 * Result wrapper for every intelligence read. Pages switch on `status` to
 * render loading / empty / error / disabled / success — never a blank screen,
 * and never fabricated data (the fallback is always empty).
 */

export type IntelStatus = "ok" | "empty" | "error" | "disabled";

export interface Intel<T> {
  status: IntelStatus;
  data: T;
  error?: string;
}

function defaultIsEmpty(value: unknown): boolean {
  if (Array.isArray(value)) return value.length === 0;
  return value == null;
}

/**
 * Execute a real-data read with uniform states. `enabled: false` (a required
 * key is missing) yields a "disabled" empty result instead of fake data.
 */
export async function intel<T>(opts: {
  enabled?: boolean;
  empty: T;
  run: () => Promise<T>;
  isEmpty?: (value: T) => boolean;
}): Promise<Intel<T>> {
  if (opts.enabled === false) {
    return { status: "disabled", data: opts.empty };
  }
  try {
    const data = await opts.run();
    const empty = (opts.isEmpty ?? defaultIsEmpty)(data);
    return { status: empty ? "empty" : "ok", data };
  } catch (err) {
    return {
      status: "error",
      data: opts.empty,
      error: err instanceof Error ? err.message : "Failed to load data",
    };
  }
}
