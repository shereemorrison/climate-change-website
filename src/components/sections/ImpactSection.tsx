"use client";

import { useRef, type CSSProperties } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { Container } from "@/components/layout/Container";
import { PAGE_CONTAINER } from "@/lib/constants";
import { impactItems } from "@/data/impact";
import { GSAP_EASE, STAGGER } from "@/lib/motion";
import { cn } from "@/utils/cn";

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = section.querySelectorAll("[data-impact-card]");

      gsap.fromTo(
        cards,
        { y: 56, opacity: 0, rotateX: 8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.05,
          stagger: STAGGER.base,
          ease: GSAP_EASE.cinematic,
          scrollTrigger: {
            trigger: section.querySelector("[data-impact-grid]"),
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="impact-section"
      aria-labelledby="impact-heading"
    >
      <Container width={PAGE_CONTAINER}>
        <header className="impact-section__header">
          <p className="impact-section__eyebrow">What changes</p>
          <h2 id="impact-heading" className="impact-section__title">
            The cost is measured in places, not percentages
          </h2>
        </header>

        <div className="impact-section__grid" data-impact-grid>
          {impactItems.map((item, index) => (
            <article
              key={item.id}
              data-impact-card
              className={cn("impact-card", `impact-card--${item.tone}`)}
              style={{ "--impact-index": index } as CSSProperties}
            >
              <div className="impact-card__stat">
                <span className="impact-card__stat-value">{item.stat}</span>
                <span className="impact-card__stat-label">{item.statLabel}</span>
              </div>
              <h3 className="impact-card__title">{item.title}</h3>
              <p className="impact-card__description">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
