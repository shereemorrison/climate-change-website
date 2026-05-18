"use client";

import { useRef, type CSSProperties } from "react";
import { useDiveProgressRef } from "@/context/JourneyRefContext";
import { useEarthDive } from "@/hooks/useEarthDive";
import { useDiveProgress } from "@/hooks/useDiveProgress";
import { earthFacts } from "@/data/earth-facts";
import { getDiveFactMotion } from "@/lib/earth-dive-motion";
import { cn } from "@/utils/cn";

function factTransform(align: string, y: number, scale: number): string {
  const x = align === "center" ? "-50%" : align === "end" ? "-100%" : "0";
  return `translate(${x}, -50%) translateY(${y}px) scale(${scale})`;
}

const HIDDEN_FACT = {
  opacity: 0,
  scale: 0.2,
  y: 0,
  blur: 10,
  visible: false,
};

export function EarthDiveTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const diveProgressRef = useDiveProgressRef();

  useEarthDive(sectionRef, diveProgressRef);
  const diveProgress = useDiveProgress();

  return (
    <section
      ref={sectionRef}
      id="earth-dive"
      className="earth-dive"
      aria-labelledby="earth-heading"
    >
      <div className="earth-dive__pin">
        <div className="earth-dive__vignette" data-dive-vignette aria-hidden />
        <div className="earth-dive__scrim" data-dive-scrim aria-hidden />
        <div className="earth-dive__atmosphere" aria-hidden />

        <div className="earth-dive__content" data-dive-content>
          <header className="earth-dive__header">
            <p className="earth-dive__eyebrow">One planet</p>
            <h2 id="earth-heading" className="earth-dive__title">
              This is the only home we have
            </h2>
          </header>

          <div className="earth-dive__facts" aria-live="polite">
            {earthFacts.map((fact) => {
              const motion =
                diveProgress >= 0
                  ? getDiveFactMotion(diveProgress, fact)
                  : HIDDEN_FACT;

              return (
                <article
                  key={fact.id}
                  className={cn(
                    "earth-fact",
                    `earth-fact--${fact.variant}`,
                    `earth-fact--align-${fact.align}`,
                    motion.visible && "earth-fact--visible",
                  )}
                  style={
                    {
                      "--fact-x": `${fact.x}%`,
                      "--fact-y": `${fact.y}%`,
                      "--fact-scale": motion.scale,
                      opacity: motion.opacity,
                      transform: factTransform(fact.align, motion.y, motion.scale),
                      filter: `blur(${motion.blur}px)`,
                    } as CSSProperties
                  }
                >
                  <p className="earth-fact__value">{fact.value}</p>
                  <p className="earth-fact__label">{fact.label}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
