import type { Metadata } from "next";
import { Shell } from "@/components/platform/Shell";
import { appNav } from "@/lib/navigation";
import { zoneUrls } from "@/lib/urls";

const APP_DESC =
  "Intelligence, narratives, ecosystems, and signals in one place.";

export const metadata: Metadata = {
  // Own metadataBase so the OG image URL resolves on the app subdomain.
  metadataBase: new URL(zoneUrls.app),
  title: {
    default: "Loreon App",
    template: "%s · Loreon App",
  },
  description: APP_DESC,
  openGraph: {
    type: "website",
    url: zoneUrls.app,
    siteName: "Loreon App",
    title: "Loreon App",
    description: APP_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: "Loreon App",
    description: APP_DESC,
  },
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
