"use client";

import { Suspense, type MutableRefObject } from "react";
import { Environment, Lightformer } from "@react-three/drei";
import { CinematicPlanet } from "@/components/planet/CinematicPlanet";
import { StarsField } from "@/components/planet/StarsField";
import type { Theme } from "@/hooks/useTheme";

const SCENE_PALETTE: Record<Theme, { bg: string; fog: string }> = {
  dark: { bg: "#030608", fog: "#030608" },
  light: { bg: "#e8f0ec", fog: "#e8f0ec" },
};

type PlanetStageProps = {
  scrollProgress?: number;
  scrollProgressRef?: MutableRefObject<number>;
  showStars?: boolean;
  planetScale?: number;
  enableIntro?: boolean;
  scrollTurns?: number;
  idleSpeed?: number;
  tone?: Theme;
  transparentBg?: boolean;
  centerPlanet?: boolean;
};

export function PlanetStage({
  scrollProgress = 0,
  scrollProgressRef,
  showStars = true,
  planetScale = 0.9,
  enableIntro = true,
  scrollTurns,
  idleSpeed,
  tone = "dark",
  transparentBg = false,
  centerPlanet = false,
}: PlanetStageProps) {
  const palette = SCENE_PALETTE[tone];
  const showStarfield = showStars && tone === "dark";

  return (
    <>
      {!transparentBg && <color attach="background" args={[palette.bg]} />}
      {!transparentBg && <fog attach="fog" args={[palette.fog, 12, 32]} />}
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 4, 4]} intensity={1.4} color="#fff4e0" />
      <directionalLight position={[-4, -2, -3]} intensity={0.45} color="#4a8a9a" />

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0.8, 0]}>
          <Lightformer
            form="circle"
            intensity={2.2}
            color="#81c784"
            position={[0, 6, -8]}
            scale={12}
          />
          <Lightformer
            form="circle"
            intensity={1.6}
            color="#b3e5fc"
            position={[6, 2, 2]}
            scale={8}
          />
          <Lightformer
            form="circle"
            intensity={1.2}
            color="#4caf50"
            position={[-6, -1, 0]}
            scale={10}
          />
        </group>
      </Environment>

      {showStarfield && <StarsField />}

      <Suspense fallback={null}>
        <group position={centerPlanet ? [0, 0, 0] : [0.95, -0.05, 0]}>
          <CinematicPlanet
            centered={centerPlanet}
            scale={planetScale}
            scrollProgress={scrollProgress}
            scrollProgressRef={scrollProgressRef}
            enableIntro={enableIntro}
            scrollTurns={scrollTurns}
            idleSpeed={idleSpeed}
          />
        </group>
      </Suspense>
    </>
  );
}
