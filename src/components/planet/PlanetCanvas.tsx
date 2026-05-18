"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { PlanetStage } from "@/components/planet/PlanetStage";
import { useDeviceGraphicsProfile } from "@/hooks/planet/useDeviceGraphicsProfile";
import type { Theme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

type PlanetCanvasProps = {
  scrollProgress?: number;
  showStars?: boolean;
  planetScale?: number;
  enableIntro?: boolean;
  className?: string;
  cameraZ?: number;
  /** Horizontal camera offset — use 0 to center the planet */
  cameraX?: number;
  scrollTurns?: number;
  idleSpeed?: number;
  /** Scene backdrop — hero stays dark; earth section follows site theme */
  tone?: Theme;
};

export function PlanetCanvas({
  scrollProgress = 0,
  showStars = true,
  planetScale = 1.15,
  enableIntro = true,
  className,
  cameraZ = 5.8,
  cameraX = 0.35,
  scrollTurns,
  idleSpeed,
  tone = "dark",
}: PlanetCanvasProps) {
  const { dpr, isMobile } = useDeviceGraphicsProfile();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.02 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn("planet-canvas", className)}
      aria-hidden
    >
      <Suspense fallback={<div className="planet-canvas__fallback" />}>
        <Canvas
          dpr={dpr}
          frameloop={active ? "always" : "demand"}
          camera={{ position: [cameraX, 0, cameraZ], fov: isMobile ? 24 : 20, near: 0.1, far: 50 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          performance={{ min: 0.5 }}
        >
          <PlanetStage
            scrollProgress={scrollProgress}
            showStars={showStars}
            planetScale={planetScale}
            enableIntro={enableIntro}
            scrollTurns={scrollTurns}
            idleSpeed={idleSpeed}
            tone={tone}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
