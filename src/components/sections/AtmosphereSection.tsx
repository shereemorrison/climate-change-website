"use client";

import { useRef, type CSSProperties } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { Container } from "@/components/layout/Container";
import { PAGE_CONTAINER } from "@/lib/constants";
import { TextSplit } from "@/components/typography/TextSplit";
import { atmosphereLayers, atmosphereNarrative } from "@/data/atmosphere";
import { useTextReveal } from "@/hooks/useTextReveal";
import { GSAP_EASE, STAGGER } from "@/lib/motion";

export function AtmosphereSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useTextReveal(sectionRef);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const layers = section.querySelectorAll("[data-atmo-layer]");
      const glow = section.querySelector("[data-atmo-glow]");

      gsap.fromTo(
        layers,
        { x: -48, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: STAGGER.base,
          ease: GSAP_EASE.cinematic,
          scrollTrigger: {
            trigger: section.querySelector(".atmo-section__layers"),
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      if (glow) {
        gsap.to(glow, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="atmosphere"
      className="atmo-section journey-section journey-section--content-left"
      data-earth-anchor="center"
      data-earth-scale="0.82"
      data-earth-y="40"
      aria-labelledby="atmo-heading"
    >
      <div className="atmo-section__glow" data-atmo-glow aria-hidden />
      <div className="atmo-section__mesh" aria-hidden />

      <Container width={PAGE_CONTAINER}>
        <div className="atmo-section__grid">
          <header className="atmo-section__lead">
            <p className="atmo-section__eyebrow" data-text-reveal>
              The thinning veil
            </p>
            <TextSplit
              id="atmo-heading"
              lines={["We live inside a fragile", "envelope of air and water"]}
              className="atmo-section__title"
            />

            <div className="atmo-section__body">
              <p className="atmo-section__lede" data-text-scrub>
                {atmosphereNarrative.lede}
              </p>

              {atmosphereNarrative.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="atmo-section__paragraph"
                  data-text-reveal
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </header>

          <ol className="atmo-section__layers">
            {atmosphereLayers.map((layer, index) => (
              <li
                key={layer.id}
                data-atmo-layer
                className="atmo-layer"
                style={{ "--atmo-index": index } as CSSProperties}
              >
                <span className="atmo-layer__depth">{layer.depth}</span>
                <h3 className="atmo-layer__name">{layer.name}</h3>
                <p className="atmo-layer__detail">{layer.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
