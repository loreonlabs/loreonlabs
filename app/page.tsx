import { Backdrop } from "@/components/Backdrop";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { NarrativePulse } from "@/components/sections/NarrativePulse";
import { FounderSignals } from "@/components/sections/FounderSignals";
import { ProjectDiscovery } from "@/components/sections/ProjectDiscovery";
import { EcosystemIntelligence } from "@/components/sections/EcosystemIntelligence";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
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
      <LoadingScreen />
      <Backdrop />
      <Navbar />
      <main className="relative">
        <Hero />
        <NarrativePulse />
        <FounderSignals />
        <ProjectDiscovery />
        <EcosystemIntelligence />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
