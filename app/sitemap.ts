import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { docsOrder } from "@/lib/navigation";

/**
 * Sitemap spanning all three Loreon zones (landing + app + docs). Doc routes
 * are derived from the ordered docs navigation so this stays in sync.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const docs: MetadataRoute.Sitemap = docsOrder.map((d) => ({
    url: `${site.docsUrl}${d.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: site.appUrl, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: site.docsUrl, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...docs,
  ];
}
