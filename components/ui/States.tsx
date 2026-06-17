import type { ReactNode } from "react";
import Link from "next/link";
import type { IntelStatus } from "@/lib/intel/result";
import { RadarIcon, PulseIcon, ShieldCheck } from "@/components/icons";

/** Premium empty / error / disabled state blocks. No blank screens, ever. */

type Action = { label: string; href: string };

function Frame({
  icon,
  title,
  message,
  action,
}: {
  icon: ReactNode;
  title: string;
  message: string;
  action?: Action;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center shadow-card">
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-accent-ink">
        {icon}
      </span>
      <p className="mt-4 text-sm font-semibold text-foreground">{title}</p>
      <p className="mx-auto mt-1.5 max-w-md text-[13px] leading-relaxed text-muted">
        {message}
      </p>
      {action && (
        <Link
          href={action.href}
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-[13px] font-medium text-foreground shadow-card transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-2"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function EmptyState({
  title = "No matching intelligence found yet.",
  message = "Loreon is still monitoring this signal — check back shortly as new coverage lands.",
  icon,
  action,
}: {
  title?: string;
  message?: string;
  icon?: ReactNode;
  action?: Action;
}) {
  return (
    <Frame
      icon={icon ?? <RadarIcon width={20} height={20} />}
      title={title}
      message={message}
      action={action}
    />
  );
}

export function ErrorState({ message }: { message?: string }) {
  return (
    <Frame
      icon={<ShieldCheck width={20} height={20} />}
      title="Couldn't load live data"
      message={
        message ?? "The upstream source is temporarily unavailable. Please retry in a moment."
      }
    />
  );
}

export function DisabledState({ service }: { service: string }) {
  return (
    <Frame
      icon={<PulseIcon width={20} height={20} />}
      title={`${service} is not configured`}
      message="No verified sources are available for this topic yet — add the provider key to enable it. No placeholder data is shown."
    />
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
  empty?: { title?: string; message?: string; action?: Action };
}) {
  if (status === "ok") return null;
  if (status === "disabled") return <DisabledState service={service ?? "This source"} />;
  if (status === "error") return <ErrorState message={error} />;
  return (
    <EmptyState title={empty?.title} message={empty?.message} action={empty?.action} />
  );
}
