import { ScrollMarquee } from "@/components/animations/ScrollMarquee";
import { SiteShell } from "@/components/layout/SiteShell";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JourneyMain } from "@/components/layout/JourneyMain";
import { HeroSection } from "@/components/sections/HeroSection";
import { TemperatureStorySection } from "@/components/sections/TemperatureStorySection";
import { AtmosphereSection } from "@/components/sections/AtmosphereSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { EarthDiveTransition } from "@/components/sections/EarthDiveTransition";
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
      <JourneyMain>
        <HeroSection />

        <ScrollMarquee
          items={MARQUEE_SIGNALS}
          className="scroll-marquee--signals scroll-marquee--journey"
        />

        <TemperatureStorySection />
        <AtmosphereSection />
        <ImpactSection />
        <EarthDiveTransition />
        <SolutionsSection />

        <ScrollMarquee
          items={MARQUEE_HOPE}
          className="scroll-marquee--hope scroll-marquee--journey"
        />
      </JourneyMain>
      <Footer />
    </SiteShell>
  );
}
