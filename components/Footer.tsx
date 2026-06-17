import { Logo } from "./Logo";
import { site } from "@/lib/site";

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const footerLinks = [
  { label: "App", href: site.appUrl, external: false },
  { label: "Docs", href: site.docsUrl, external: false },
  { label: "X / Twitter", href: site.twitterUrl, external: true },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/70">
      <div className="signal-divider absolute inset-x-0 top-0" />
      <div className="container-page py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xs">
            <Logo size={36} />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Intelligence and discovery for what gains attention before
              consensus.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {link.label === "X / Twitter" && <XIcon />}
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-muted/70">
            Discover what gains attention before consensus.
          </p>
        </div>
      </div>
    </footer>
  );
}
