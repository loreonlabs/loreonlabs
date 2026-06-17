import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  icon?: ReactNode;
};

/**
 * Section heading — a terminal-style intelligence label (live scan dot + mono
 * eyebrow + signature accent line) over a large gradient title. Shared across
 * every landing section for one coherent, premium system.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"}>
      <Reveal>
        <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-accent-ink">
            {eyebrow}
          </span>
          <span className="h-px w-12 bg-gradient-to-r from-accent/70 to-transparent" />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-5 text-balance text-[2rem] font-semibold leading-[1.08] tracking-tight text-gradient sm:text-[2.5rem] md:text-[3rem]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={`mt-4 text-pretty text-base leading-relaxed text-body sm:text-lg ${
              center ? "mx-auto max-w-xl" : "max-w-xl"
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
