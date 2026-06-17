"use client";

import { Reveal } from "../Reveal";
import { ArrowRight } from "../icons";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative py-12 sm:py-24 lg:py-32">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-background-tertiary px-6 py-12 text-center shadow-card sm:px-12 sm:py-20">
            {/* ambient glow + grid */}
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 mask-radial" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />

            <div className="relative">
              <span className="badge mx-auto">
                <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
                Stay ahead
              </span>
              <h2 className="mx-auto mt-6 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-gradient sm:text-4xl md:text-5xl md:leading-[1.08]">
                Attention moves fast.
                <br className="hidden sm:block" />{" "}
                <span className="text-gradient-accent">Stay ahead of it.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted sm:text-lg">
                Start surfacing the narratives, founders, and projects shaping
                what comes next — before the rest of the market catches on.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={site.appUrl} className="btn-primary w-full sm:w-auto">
                  Open App
                  <ArrowRight width={16} height={16} />
                </a>
                <a href={site.docsUrl} className="btn-secondary w-full sm:w-auto">
                  Read Docs
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
