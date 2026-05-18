"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { defaultLenisOptions } from "@/lib/lenis-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function useLenis() {
  const lenisRef = useRef<import("lenis").default | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    void (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      registerGSAP();

      const lenis = new Lenis({
        ...defaultLenisOptions,
        autoRaf: false,
      });

      lenisRef.current = lenis;
      document.documentElement.classList.add("lenis", "lenis-smooth");

      lenis.on("scroll", ScrollTrigger.update);

      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      const onWindowResize = () => lenis.resize();
      window.addEventListener("resize", onWindowResize);

      requestAnimationFrame(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });

      teardown = () => {
        gsap.ticker.remove(tickerCallback);
        window.removeEventListener("resize", onWindowResize);
        lenis.destroy();
        lenisRef.current = null;
        document.documentElement.classList.remove("lenis", "lenis-smooth");
        ScrollTrigger.scrollerProxy(document.documentElement, {});
      };
    })();

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, [reducedMotion]);

  return lenisRef;
}
