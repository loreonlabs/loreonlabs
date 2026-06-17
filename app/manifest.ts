import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Web app manifest — shared across all three zones (landing / app / docs),
// which are served from the same Next.js app. Icons reference the single
// official logo asset (/loreon-logo.png) only.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    icons: [
      {
        src: "/loreon-logo.png",
        type: "image/png",
        sizes: "any",
        purpose: "any",
      },
    ],
  };
}
