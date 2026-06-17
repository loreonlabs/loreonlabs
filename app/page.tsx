import { Backdrop } from "@/components/Backdrop";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { NARRATIVE_THEMES, ECOSYSTEMS, LAUNCHPADS } from "@/lib/intel/config";
import { PlatformOverview } from "@/components/sections/PlatformOverview";
import { KeyCapabilities } from "@/components/sections/KeyCapabilities";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { MethodologyPreview } from "@/components/sections/MethodologyPreview";
import { IntelligencePrinciples } from "@/components/sections/IntelligencePrinciples";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: site.description,
  url: site.url,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

// Real coverage figures (derived from the curated config + live integrations).
const heroStats = [
  { label: "Narratives", value: NARRATIVE_THEMES.length },
  { label: "Ecosystems", value: ECOSYSTEMS.length },
  { label: "Launchpads", value: LAUNCHPADS.length },
  { label: "Live sources", value: 7 },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Backdrop />
      <Navbar />
      <main className="relative">
        <Hero stats={heroStats} />
        <PlatformOverview />
        <KeyCapabilities />
        <FeatureShowcase />
        <MethodologyPreview />
        <IntelligencePrinciples />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
