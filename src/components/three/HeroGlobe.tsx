"use client";

import { SceneCanvas } from "@/components/three/SceneCanvas";
import { AtmosphericGlobe } from "@/components/three/AtmosphericGlobe";

export function HeroGlobe() {
  return (
    <SceneCanvas className="h-full">
      <AtmosphericGlobe />
    </SceneCanvas>
  );
}
