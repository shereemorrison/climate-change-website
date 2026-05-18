"use client";

import { useEffect, useState, type RefObject } from "react";
import { ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** 0–1 progress through a GSAP-pinned immersive section. */
export function usePinnedScrollProgress(
  sectionRef: RefObject<HTMLElement | null>,
  pinRef: RefObject<HTMLElement | null>,
  scrollLength = "+=140%",
) {
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    if (reducedMotion) {
      setProgress(0.45);
      return;
    }

    registerGSAP();

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: scrollLength,
      pin,
      scrub: 0.9,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => trigger.kill();
  }, [sectionRef, pinRef, scrollLength, reducedMotion]);

  return progress;
}
