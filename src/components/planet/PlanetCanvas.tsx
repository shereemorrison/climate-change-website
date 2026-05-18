"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState, type MutableRefObject } from "react";
import { DiveCamera } from "@/components/planet/DiveCamera";
import { PlanetStage } from "@/components/planet/PlanetStage";
import { useDeviceGraphicsProfile } from "@/hooks/planet/useDeviceGraphicsProfile";
import type { Theme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

type PlanetCanvasProps = {
  scrollProgress?: number;
  scrollProgressRef?: MutableRefObject<number>;
  showStars?: boolean;
  planetScale?: number;
  enableIntro?: boolean;
  className?: string;
  cameraZ?: number;
  cameraX?: number;
  scrollTurns?: number;
  idleSpeed?: number;
  tone?: Theme;
  transparentBg?: boolean;
  alwaysActive?: boolean;
  centerPlanet?: boolean;
  cameraZRef?: MutableRefObject<number>;
};

export function PlanetCanvas({
  scrollProgress = 0,
  scrollProgressRef,
  showStars = true,
  planetScale = 1.15,
  enableIntro = true,
  className,
  cameraZ = 5.8,
  cameraX = 0.35,
  scrollTurns,
  idleSpeed,
  tone = "dark",
  transparentBg = false,
  alwaysActive = false,
  centerPlanet = false,
  cameraZRef,
}: PlanetCanvasProps) {
  const { dpr, isMobile } = useDeviceGraphicsProfile();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (alwaysActive) return;
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.02 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [alwaysActive]);

  return (
    <div ref={rootRef} className={cn("planet-canvas", className)} aria-hidden>
      <Suspense fallback={transparentBg ? null : <div className="planet-canvas__fallback" />}>
        <Canvas
          dpr={dpr}
          frameloop={active ? "always" : "demand"}
          camera={{
            position: [cameraX, 0, cameraZRef ? cameraZ : cameraZ],
            fov: isMobile ? 24 : 20,
            near: 0.1,
            far: 50,
          }}
          gl={{
            antialias: true,
            alpha: transparentBg,
            powerPreference: "high-performance",
          }}
          performance={{ min: 0.5 }}
        >
          {cameraZRef && <DiveCamera cameraZRef={cameraZRef} cameraX={cameraX} />}
          <PlanetStage
            scrollProgress={scrollProgress}
            scrollProgressRef={scrollProgressRef}
            showStars={showStars}
            planetScale={planetScale}
            enableIntro={enableIntro}
            scrollTurns={scrollTurns}
            idleSpeed={idleSpeed}
            tone={tone}
            transparentBg={transparentBg}
            centerPlanet={centerPlanet}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
