import type { Metadata } from "next";
import { Shell } from "@/components/platform/Shell";
import { docsNav } from "@/lib/navigation";
import { zoneUrls } from "@/lib/urls";

export const metadata: Metadata = {
  title: {
    default: "Documentation",
    template: "%s · LoreonLabs Docs",
  },
  description:
    "LoreonLabs documentation — what the platform is, why it exists, how it works, its data sources, and scoring methodology.",
};

const crossLinks = [
  { label: "Open App", href: zoneUrls.app },
  { label: "Home", href: zoneUrls.landing },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell section="Docs" groups={docsNav} links={crossLinks}>
      {children}
    </Shell>
  );
}
