import type { Metadata } from "next";
import { Shell } from "@/components/platform/Shell";
import { appNav } from "@/lib/navigation";
import { zoneUrls } from "@/lib/urls";

export const metadata: Metadata = {
  title: {
    default: "Platform",
    template: "%s · LoreonLabs Platform",
  },
  description:
    "The LoreonLabs product platform — discovery, narratives, founders, projects, ecosystems, markets, and unified search.",
};

const crossLinks = [
  { label: "Docs", href: zoneUrls.docs },
  { label: "Home", href: zoneUrls.landing },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell section="Platform" groups={appNav} links={crossLinks}>
      {children}
    </Shell>
  );
}
