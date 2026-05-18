"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

/** Light nav text over dark cinematic surfaces (hero; earth & NASA only in dark theme). */
export function useLightNav(): boolean {
  const { theme } = useTheme();
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

      if (theme === "dark") {
        for (const id of ["earth", "nasa"]) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const inView = rect.top < vh * 0.15 && rect.bottom > vh * 0.35;
          if (inView) {
            setUseLight(true);
            return;
          }
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
  }, [theme]);

  return useLight;
}
