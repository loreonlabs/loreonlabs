/**
 * Shared service response contract (pure types — safe to import anywhere,
 * including client components that render service data).
 *
 * Every service returns a `ServiceResponse<T>` so the UI can switch on a single
 * status and always has a safe `data` fallback:
 *
 *  - "ok"       → live (or cached) data is present
 *  - "empty"    → the call succeeded but returned nothing
 *  - "disabled" → the integration's API key is not configured (safe fallback)
 *  - "error"    → the call failed (safe fallback data is still provided)
 *
 * `data` is never undefined — services supply an empty fallback for every
 * outcome, so consumers never need to null-check.
 */

export type ServiceStatus = "ok" | "empty" | "disabled" | "error";

export interface ServiceResponse<T> {
  status: ServiceStatus;
  data: T;
  error?: string;
  cached?: boolean;
}

export const isOk = <T>(r: ServiceResponse<T>): boolean => r.status === "ok";
export const isUnavailable = <T>(r: ServiceResponse<T>): boolean =>
  r.status === "disabled" || r.status === "error";
