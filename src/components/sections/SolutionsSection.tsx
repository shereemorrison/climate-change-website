"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { Container } from "@/components/layout/Container";
import { PAGE_CONTAINER } from "@/lib/constants";
import { TextSplit } from "@/components/typography/TextSplit";
import { climateSolutions } from "@/data/solutions";
import { useTextReveal } from "@/hooks/useTextReveal";
import { GSAP_EASE, STAGGER } from "@/lib/motion";

export function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useTextReveal(sectionRef);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = section.querySelectorAll("[data-solution-card]");

      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: STAGGER.wide,
          ease: GSAP_EASE.reveal,
          scrollTrigger: { trigger: cards[0], start: "top 90%" },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="solutions-section journey-section journey-section--content-left"
      data-earth-anchor="left"
      data-earth-scale="0.7"
      data-earth-y="50"
      aria-labelledby="solutions-heading"
    >
      <div className="solutions-section__glow" aria-hidden />

      <Container width={PAGE_CONTAINER}>
        <header className="solutions-section__intro">
          <p className="solutions-section__eyebrow" data-text-reveal>
            What we can do
          </p>
          <TextSplit
            id="solutions-heading"
            lines={["The future is still", "being written"]}
            className="solutions-section__title"
          />
          <p className="solutions-section__lede" data-text-scrub>
            The science is clear — and so is the path forward. Renewable energy, restored
            ecosystems, smarter cities, and collective will can bend the curve toward stability.
          </p>
        </header>

        <div className="solutions-grid">
          {climateSolutions.map((item) => (
            <article key={item.id} data-solution-card className="solution-card">
              <div>
                <p className="solution-card__metric">{item.metric}</p>
                <p className="solution-card__metric-label">{item.metricLabel}</p>
              </div>
              <h3 className="solution-card__title">{item.title}</h3>
              <p className="solution-card__description">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
