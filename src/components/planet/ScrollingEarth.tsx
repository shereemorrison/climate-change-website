"use client";

import dynamic from "next/dynamic";
import type { MutableRefObject } from "react";
import { useEarthJourney } from "@/hooks/useEarthJourney";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

const PlanetCanvas = dynamic(
  () => import("@/components/planet/PlanetCanvas").then((m) => m.PlanetCanvas),
  { ssr: false },
);

type ScrollingEarthProps = {
  mainRef: React.RefObject<HTMLElement | null>;
  earthRef: React.RefObject<HTMLDivElement | null>;
  scrollProgressRef: MutableRefObject<number>;
  cameraZRef: MutableRefObject<number>;
  diveProgressRef: MutableRefObject<number>;
};

export function ScrollingEarth({
  mainRef,
  earthRef,
  scrollProgressRef,
  cameraZRef,
  diveProgressRef,
}: ScrollingEarthProps) {
  const { theme } = useTheme();

  useEarthJourney(mainRef, earthRef, scrollProgressRef, diveProgressRef, cameraZRef);

  return (
    <div
      ref={earthRef}
      className={cn("scrolling-earth", theme === "light" && "scrolling-earth--light")}
      aria-hidden
    >
      <div className="scrolling-earth__viewport">
        <PlanetCanvas
          scrollProgressRef={scrollProgressRef}
          cameraZRef={cameraZRef}
          enableIntro={false}
          alwaysActive
          showStars={theme === "dark"}
          tone={theme}
          transparentBg
          planetScale={1}
          cameraZ={8}
          cameraX={0}
          centerPlanet
          className="scrolling-earth__canvas"
        />
      </div>
    </div>
  );
}
