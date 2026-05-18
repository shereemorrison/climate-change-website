import { ScrollMarquee } from "@/components/animations/ScrollMarquee";
import { SiteShell } from "@/components/layout/SiteShell";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TemperatureStorySection } from "@/components/sections/TemperatureStorySection";
import { LiveSignalsSection } from "@/components/sections/LiveSignalsSection";
import { GlobalDataSection } from "@/components/sections/GlobalDataSection";
import { AtmosphereSection } from "@/components/sections/AtmosphereSection";
import { NasaEarthSection } from "@/components/sections/NasaEarthSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { EarthSection } from "@/components/sections/EarthSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";

const MARQUEE_SIGNALS = [
  "Rising seas",
  "Record heat",
  "Ice loss",
  "Wildfire",
  "Drought",
  "Ocean acidification",
];

const MARQUEE_HOPE = [
  "Renewable energy",
  "Restoration",
  "Clean transport",
  "Community action",
  "Net zero",
  "Regeneration",
];

export default function Home() {
  return (
    <SiteShell>
      <Header />
      <main id="main-content">
        <HeroSection />

        <ScrollMarquee items={MARQUEE_SIGNALS} className="scroll-marquee--dark" />

        <TemperatureStorySection />

        <LiveSignalsSection />
        <GlobalDataSection />

        <AtmosphereSection />
        <ImpactSection />

        <NasaEarthSection />
        <EarthSection />
        <SolutionsSection />

        <ScrollMarquee items={MARQUEE_HOPE} className="scroll-marquee--hope" />
      </main>
      <Footer />
    </SiteShell>
  );
}
