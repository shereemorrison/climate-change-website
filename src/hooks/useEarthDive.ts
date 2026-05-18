"use client";

import { useEffect, type MutableRefObject, type RefObject } from "react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { getLenisScroller } from "@/lib/lenis-config";
import {
  DIVE_PHASE,
  DIVE_PIN_SCROLL,
  diveScrimOpacity,
  getDiveContentStyle,
} from "@/lib/earth-dive-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function clamp01(t: number) {
  return Math.max(0, Math.min(1, t));
}

function smoothstep(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

export function useEarthDive(
  sectionRef: RefObject<HTMLElement | null>,
  diveProgressRef: MutableRefObject<number>,
) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const impact = document.getElementById("impact");
    const solutions = document.getElementById("solutions");
    const solutionsIntro = solutions?.querySelector<HTMLElement>(".solutions-section__intro");
    const solutionsGrid = solutions?.querySelector<HTMLElement>(".solutions-grid");
    const vignette = section.querySelector("[data-dive-vignette]");
    const scrim = section.querySelector("[data-dive-scrim]");
    const content = section.querySelector("[data-dive-content]");

    const applySolutionsHandoff = (progress: number) => {
      if (!solutionsIntro) return;

      const revealStart = DIVE_PHASE.zoomOutStart + 0.04;
      const t =
        progress < revealStart
          ? 0
          : clamp01((progress - revealStart) / (1 - revealStart));
      const eased = smoothstep(t);

      gsap.set(solutionsIntro, {
        opacity: eased,
        y: (1 - eased) * 28,
        pointerEvents: eased > 0.5 ? "auto" : "none",
      });

      if (solutionsGrid) {
        const gridT = clamp01((eased - 0.25) / 0.75);
        gsap.set(solutionsGrid, {
          opacity: smoothstep(gridT),
          y: (1 - smoothstep(gridT)) * 20,
        });
      }
    };

    const resetSolutionsHandoff = () => {
      if (solutionsIntro) {
        gsap.set(solutionsIntro, { clearProps: "opacity,y,pointerEvents" });
      }
      if (solutionsGrid) {
        gsap.set(solutionsGrid, { clearProps: "opacity,y" });
      }
    };

    const applyChrome = (progress: number) => {
      if (impact) {
        const fadeEnd = DIVE_PHASE.zoomInEnd * 0.85;
        const impactFade =
          progress < fadeEnd ? Math.max(0, 1 - (progress / fadeEnd) * 1.15) : 0;
        gsap.set(impact, { opacity: impactFade });
      }

      if (vignette) {
        const vignetteOpacity =
          progress > 0.06 && progress < DIVE_PHASE.zoomOutEnd
            ? Math.min(0.55, progress * 1.8)
            : 0;
        gsap.set(vignette, { opacity: vignetteOpacity });
      }

      if (scrim) {
        gsap.set(scrim, { opacity: diveScrimOpacity(progress) * 0.92 });
      }

      if (content) {
        const { opacity, scale, y } = getDiveContentStyle(progress);
        gsap.set(content, {
          opacity,
          scale,
          y,
          transformOrigin: "50% 28%",
          pointerEvents: "none",
        });
      }
    };

    const endDive = () => {
      diveProgressRef.current = -1;
      applyChrome(0);
      if (impact) gsap.set(impact, { opacity: 1 });
    };

    if (reducedMotion) {
      diveProgressRef.current = -1;
      return;
    }

    registerGSAP();
    const scroller = getLenisScroller();

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: DIVE_PIN_SCROLL,
      pin: true,
      pinSpacing: true,
      scrub: 1.6,
      scroller,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => {
        diveProgressRef.current = 0;
      },
      onEnterBack: () => {
        diveProgressRef.current = 0;
      },
      onLeave: endDive,
      onLeaveBack: endDive,
      onUpdate: (self) => {
        diveProgressRef.current = self.progress;
        applyChrome(self.progress);
      },
    });

    applyChrome(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      trigger.kill();
      endDive();
      window.removeEventListener("resize", onResize);
    };
  }, [sectionRef, diveProgressRef, reducedMotion]);
}
