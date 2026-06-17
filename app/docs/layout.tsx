import type { Metadata } from "next";
import { Shell } from "@/components/platform/Shell";
import { ReadingProgress } from "@/components/docs/ReadingProgress";
import { docsNav } from "@/lib/navigation";
import { zoneUrls } from "@/lib/urls";

const DOCS_DESC =
  "Methodology, sources, validation, and intelligence framework.";

export const metadata: Metadata = {
  // Own metadataBase so the OG image URL resolves on the docs subdomain.
  metadataBase: new URL(zoneUrls.docs),
  title: {
    default: "Loreon Docs",
    template: "%s · Loreon Docs",
  },
  description: DOCS_DESC,
  openGraph: {
    type: "website",
    url: zoneUrls.docs,
    siteName: "Loreon Docs",
    title: "Loreon Docs",
    description: DOCS_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: "Loreon Docs",
    description: DOCS_DESC,
  },
};

const crossLinks = [
  { label: "Open App", href: zoneUrls.app },
  { label: "Home", href: zoneUrls.landing },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReadingProgress />
      <Shell section="Docs" groups={docsNav} links={crossLinks}>
        {children}
      </Shell>
    </>
  );
}
