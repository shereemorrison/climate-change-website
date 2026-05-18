"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, type CSSProperties } from "react";
import { Container } from "@/components/layout/Container";
import { PAGE_CONTAINER } from "@/lib/constants";
import { earthFacts } from "@/data/earth-facts";
import { usePinnedScrollProgress } from "@/hooks/planet/usePinnedScrollProgress";
import { cn } from "@/utils/cn";

const PlanetCanvas = dynamic(
  () =>
    import("@/components/three/planet/PlanetCanvas").then((m) => m.PlanetCanvas),
  { ssr: false, loading: () => <div className="earth-immersive__fallback" aria-hidden /> },
);

function factTransform(align: string, entrance: number): string {
  const x = align === "center" ? "-50%" : align === "end" ? "-100%" : "0";
  return `translate(${x}, calc(-50% + ${entrance}px))`;
}

export function EarthSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progress = usePinnedScrollProgress(sectionRef, pinRef, "+=175%");

  const introOpacity = useMemo(() => Math.max(0, 1 - progress * 2.2), [progress]);

  return (
    <section
      ref={sectionRef}
      id="earth"
      className="earth-immersive"
      aria-label="Earth from space"
    >
      <div ref={pinRef} className="earth-immersive__stage">
        <PlanetCanvas
          scrollProgress={progress}
          enableIntro={false}
          showStars
          planetScale={0.92}
          cameraZ={6.4}
          cameraX={0}
          className="earth-immersive__canvas"
        />

        <div className="earth-immersive__overlay" aria-hidden />
        <div className="earth-immersive__vignette" aria-hidden />
        <div className="earth-immersive__exit" aria-hidden />

        <Container width={PAGE_CONTAINER} className="earth-immersive__content">
          <div className="earth-immersive__scene">
            <div
              className="earth-immersive__intro"
              style={{
                opacity: introOpacity,
                transform: `translate(-50%, ${progress * 12}px)`,
              }}
            >
              <p className="earth-immersive__eyebrow">One planet</p>
              <h2 className="earth-immersive__title">
                This is the only home we have ever known
              </h2>
              <p className="earth-immersive__description">
                Scroll as the world turns — facts appear across the globe.
              </p>
            </div>

            <div className="earth-immersive__facts-scatter">
              {earthFacts.map((fact) => {
                const visible = progress >= fact.at - 0.05;
                const peak = Math.min(1, (progress - fact.at + 0.1) * 6);
                const entrance = visible ? (1 - Math.min(1, peak)) * 12 : 14;

                return (
                  <article
                    key={fact.id}
                    className={cn(
                      "earth-fact",
                      `earth-fact--align-${fact.align}`,
                      visible && "earth-fact--visible",
                    )}
                    style={
                      {
                        "--fact-x": `${fact.x}%`,
                        "--fact-y": `${fact.y}%`,
                        opacity: visible ? Math.min(1, peak) : 0,
                        transform: factTransform(fact.align, entrance),
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
        </Container>
      </div>
    </section>
  );
}
