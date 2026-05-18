"use client";

import { useEffect, type RefObject } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { getLenisScroller } from "@/lib/lenis-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { GSAP_EASE, STAGGER } from "@/lib/motion";

type TextRevealOptions = {
  /* Selector for elements to reveal (default `[data-text-reveal]`) */
  selector?: string;
  /** Split headline lines inside `[data-text-split]` */
  splitSelector?: string;
  triggerStart?: string;
  stagger?: number;
};

/* Scroll-triggered text reveals — lines, splits, and fade-up blocks. */
export function useTextReveal(
  scopeRef: RefObject<HTMLElement | null>,
  options: TextRevealOptions = {},
) {
  const reducedMotion = useReducedMotion();
  const {
    selector = "[data-text-reveal]",
    splitSelector = "[data-text-split]",
    triggerStart = "top 82%",
    stagger = STAGGER.base,
  } = options;

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || reducedMotion) return;

    registerGSAP();

    const scroller = getLenisScroller();

    const ctx = gsap.context(() => {
      const blocks = scope.querySelectorAll(selector);
      if (blocks.length) {
        gsap.fromTo(
          blocks,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            stagger,
            ease: GSAP_EASE.cinematic,
            scrollTrigger: {
              trigger: scope,
              start: triggerStart,
              scroller,
              toggleActions: "play none none none",
            },
          },
        );
      }

      scope.querySelectorAll(splitSelector).forEach((headline) => {
        const lines = headline.querySelectorAll("[data-text-line]");
        if (!lines.length) return;

        gsap.fromTo(
          lines,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: GSAP_EASE.cinematic,
            scrollTrigger: {
              trigger: headline,
              start: triggerStart,
              scroller,
              toggleActions: "play none none none",
            },
          },
        );
      });

      scope.querySelectorAll("[data-text-scrub]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 45%",
              scroller,
              scrub: 1.4,
            },
          },
        );
      });
    }, scope);

    return () => ctx.revert();
  }, [scopeRef, reducedMotion, selector, splitSelector, triggerStart, stagger]);
}
