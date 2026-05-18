"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

function createLazyPlanetCanvas(loadingClassName: string) {
  const PlanetCanvas = dynamic(
    () => import("@/components/planet/PlanetCanvas").then((m) => m.PlanetCanvas),
    {
      ssr: false,
      loading: () => <div className={loadingClassName} aria-hidden />,
    },
  );

  return function LazyPlanet(props: ComponentProps<typeof PlanetCanvas>) {
    return <PlanetCanvas {...props} />;
  };
}

/** Hero and default scenes */
export const LazyPlanetCanvas = createLazyPlanetCanvas("planet-canvas__fallback");

/** Earth immersive section */
export const LazyEarthPlanetCanvas = createLazyPlanetCanvas("earth-immersive__fallback");
