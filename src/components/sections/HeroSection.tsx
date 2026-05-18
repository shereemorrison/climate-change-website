"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { Container } from "@/components/layout/Container";
import { ScrollHint } from "@/components/sections/hero/ScrollHint";
import { HeroAtmosphere } from "@/components/sections/hero/HeroAtmosphere";
import { PAGE_CONTAINER } from "@/lib/constants";

const HEADLINE_LINES = ["The planet", "is changing faster", "than we are."];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !contentRef.current) return;

      const eyebrow = contentRef.current.querySelector("[data-hero-eyebrow]");
      const headlineInners = contentRef.current.querySelectorAll("[data-hero-headline]");
      const subline = contentRef.current.querySelector("[data-hero-subline]");
      const scrollHint = sectionRef.current.querySelector("[data-hero-scroll]");

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0);

      if (eyebrow) {
        intro.fromTo(eyebrow, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.95 }, 0.3);
      }

      intro.fromTo(
        headlineInners,
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.25, stagger: 0.11 },
        0.45,
      );

      if (subline) {
        intro.fromTo(subline, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.95);
      }

      if (scrollHint) {
        intro.fromTo(scrollHint, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, 1.15);
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-immersive"
      data-earth-anchor="right"
      data-earth-x="78"
      data-earth-y="48"
      data-earth-scale="1.12"
      aria-labelledby="hero-heading"
    >
      <HeroAtmosphere />
      <div className="hero-immersive__overlay" aria-hidden />

      <Container width={PAGE_CONTAINER} className="hero-immersive__content">
        <div ref={contentRef}>
          <p className="hero-immersive__eyebrow" data-hero-eyebrow>
            Atlas of Change
          </p>

          <h1 id="hero-heading" className="hero-immersive__headline">
            {HEADLINE_LINES.map((line) => (
              <span key={line} className="hero-immersive__headline-line">
                <span className="hero-immersive__headline-inner" data-hero-headline>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-immersive__subline" data-hero-subline>
            A cinematic journey through the signals of a warming world — measured in data,
            felt in landscapes, understood through time.
          </p>
        </div>
      </Container>

      <ScrollHint className="hero-immersive__scroll-hint" />
    </section>
  );
}
