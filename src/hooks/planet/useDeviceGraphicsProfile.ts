"use client";

import { useEffect, useState } from "react";

export type GraphicsProfile = {
  isMobile: boolean;
  dpr: [number, number];
  earthSegments: number;
  cloudSegments: number;
  starCount: number;
  enableClouds: boolean;
};

const DESKTOP: GraphicsProfile = {
  isMobile: false,
  dpr: [1, 1.75],
  earthSegments: 64,
  cloudSegments: 48,
  starCount: 3200,
  enableClouds: true,
};

const MOBILE: GraphicsProfile = {
  isMobile: true,
  dpr: [1, 1.25],
  earthSegments: 40,
  cloudSegments: 32,
  starCount: 1400,
  enableClouds: true,
};

export function useDeviceGraphicsProfile(): GraphicsProfile {
  const [profile, setProfile] = useState<GraphicsProfile>(DESKTOP);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const mobile = mq.matches;
      const base = mobile ? MOBILE : DESKTOP;
      setProfile(
        reduced
          ? {
              ...base,
              starCount: Math.floor(base.starCount * 0.5),
              earthSegments: Math.floor(base.earthSegments * 0.75),
            }
          : base,
      );
    };

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return profile;
}
