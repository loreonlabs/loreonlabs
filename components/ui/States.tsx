import type { ReactNode } from "react";
import type { IntelStatus } from "@/lib/intel/result";

/** Empty / error / disabled state blocks. No blank screens, ever. */

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-surface/30 p-10 text-center">
      {children}
    </div>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  message = "No results matched. Try again shortly — data refreshes continuously.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <Frame>
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mx-auto mt-1.5 max-w-md text-[13px] text-muted">{message}</p>
    </Frame>
  );
}

export function ErrorState({ message }: { message?: string }) {
  return (
    <Frame>
      <p className="text-sm font-medium text-foreground">Couldn&apos;t load live data</p>
      <p className="mx-auto mt-1.5 max-w-md text-[13px] text-muted">
        {message ?? "The upstream source is temporarily unavailable. Please retry."}
      </p>
    </Frame>
  );
}

export function DisabledState({ service }: { service: string }) {
  return (
    <Frame>
      <p className="text-sm font-medium text-foreground">{service} is not configured</p>
      <p className="mx-auto mt-1.5 max-w-md text-[13px] text-muted">
        Add the API key to enable this source. No placeholder data is shown.
      </p>
    </Frame>
  );
}

/**
 * Render the correct non-success state for an Intel result, or `null` when the
 * result is "ok" (so the caller renders its content).
 */
export function IntelFallback({
  status,
  error,
  service,
  empty,
}: {
  status: IntelStatus;
  error?: string;
  service?: string;
  empty?: { title?: string; message?: string };
}) {
  if (status === "ok") return null;
  if (status === "disabled") return <DisabledState service={service ?? "This source"} />;
  if (status === "error") return <ErrorState message={error} />;
  return <EmptyState title={empty?.title} message={empty?.message} />;
}
