import { SiteShell } from "@/components/layout/SiteShell";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { DataSection } from "@/components/sections/DataSection";
import { AtmosphereSection } from "@/components/sections/AtmosphereSection";
import { ImpactSection } from "@/components/sections/ImpactSection";

export default function Home() {
  return (
    <SiteShell>
      <Header />
      <main id="main-content">
        <HeroSection />
        <DataSection />
        <AtmosphereSection />
        <ImpactSection />
      </main>
      <Footer />
    </SiteShell>
  );
}
