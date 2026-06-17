import { readFileSync } from "fs";
import { join } from "path";

/**
 * The official Loreon logo as a base64 data URI, for embedding in next/og
 * ImageResponse (which can't fetch /public assets by relative path at build).
 * Read once and cached for the process.
 */
let cached: string | null = null;

export function logoDataUri(): string {
  if (cached) return cached;
  const buf = readFileSync(join(process.cwd(), "public", "loreon-logo.png"));
  cached = `data:image/png;base64,${buf.toString("base64")}`;
  return cached;
}
