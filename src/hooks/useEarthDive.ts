"use client";

import { useEffect, type MutableRefObject, type RefObject } from "react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { getLenisScroller } from "@/lib/lenis-config";
import {
  DIVE_PHASE,
  diveScrimOpacity,
  getDiveContentStyle,
} from "@/lib/earth-dive-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const DIVE_SCROLL_LENGTH = "+=185%";

export function useEarthDive(
  sectionRef: RefObject<HTMLElement | null>,
  diveProgressRef: MutableRefObject<number>,
) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const impact = document.getElementById("impact");
    const vignette = section.querySelector("[data-dive-vignette]");
    const scrim = section.querySelector("[data-dive-scrim]");
    const content = section.querySelector("[data-dive-content]");

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
      end: DIVE_SCROLL_LENGTH,
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
