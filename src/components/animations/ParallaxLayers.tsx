"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { cn } from "@/utils/cn";

type ParallaxLayersProps = {
  className?: string;
};

/** Soft atmospheric depth — GSAP-scrubbed, not Motion parallax. */
export function ParallaxLayers({ className }: ParallaxLayersProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const layers = root.querySelectorAll<HTMLElement>("[data-depth]");
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? 0.2);
        gsap.to(layer, {
          y: depth * -80,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={cn("parallax-layers pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div className="parallax-layers__fog parallax-layers__fog--a" data-depth="0.15" />
      <div className="parallax-layers__fog parallax-layers__fog--b" data-depth="0.35" />
      <div className="parallax-layers__glow" data-depth="0.08" />
    </div>
  );
}
