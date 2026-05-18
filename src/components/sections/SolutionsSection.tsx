"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { Container } from "@/components/layout/Container";
import { PAGE_CONTAINER } from "@/lib/constants";
import { climateSolutions } from "@/data/solutions";
import { GSAP_EASE, STAGGER } from "@/lib/motion";

export function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const intro = section.querySelector("[data-solutions-intro]");
      const cards = section.querySelectorAll("[data-solution-card]");

      if (intro) {
        gsap.fromTo(
          intro,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: GSAP_EASE.cinematic,
            scrollTrigger: { trigger: intro, start: "top 85%" },
          },
        );
      }

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
      className="solutions-section"
      aria-labelledby="solutions-heading"
    >
      <div className="solutions-section__glow" aria-hidden />

      <Container width={PAGE_CONTAINER}>
        <header data-solutions-intro className="solutions-section__intro">
          <p className="solutions-section__eyebrow">What we can do</p>
          <h2 id="solutions-heading" className="solutions-section__title">
            The future is still being written
          </h2>
          <p className="solutions-section__lede">
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
