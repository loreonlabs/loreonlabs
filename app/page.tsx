import { Backdrop } from "@/components/Backdrop";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PlatformOverview } from "@/components/sections/PlatformOverview";
import { KeyCapabilities } from "@/components/sections/KeyCapabilities";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { MethodologyPreview } from "@/components/sections/MethodologyPreview";
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
        <Hero />
        <PlatformOverview />
        <KeyCapabilities />
        <FeatureShowcase />
        <MethodologyPreview />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
