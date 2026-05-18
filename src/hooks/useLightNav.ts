"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

/** Light-colored nav text only on dark surfaces (dark-theme hero / earth-dive). */
export function useLightNav(): boolean {
  const { theme } = useTheme();
  const [useLight, setUseLight] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;

      const hero = document.getElementById("hero");
      if (theme === "light" && hero && y < hero.offsetTop + hero.offsetHeight * 0.88) {
        setUseLight(false);
        return;
      }

      if (hero && y < hero.offsetTop + hero.offsetHeight * 0.88) {
        setUseLight(true);
        return;
      }

      if (theme === "dark") {
        for (const id of ["earth-dive"]) {
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
