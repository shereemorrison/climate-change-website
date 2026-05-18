"use client";

import { useEffect, useState } from "react";

/** Light nav text over dark cinematic surfaces (hero + pinned earth). */
export function useLightNav(): boolean {
  const [useLight, setUseLight] = useState(true);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;

      const hero = document.getElementById("hero");
      if (hero && y < hero.offsetTop + hero.offsetHeight * 0.88) {
        setUseLight(true);
        return;
      }

      const earth = document.getElementById("earth");
      if (earth) {
        const rect = earth.getBoundingClientRect();
        const inEarth = rect.top < vh * 0.15 && rect.bottom > vh * 0.35;
        if (inEarth) {
          setUseLight(true);
          return;
        }
      }

      setUseLight(false);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return useLight;
}
