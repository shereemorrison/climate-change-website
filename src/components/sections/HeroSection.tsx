"use client";

import { useRef, useState } from "react";
import { LazyPlanetCanvas } from "@/components/planet/LazyPlanetCanvas";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { Container } from "@/components/layout/Container";
import { ScrollHint } from "@/components/sections/hero/ScrollHint";
import { PAGE_CONTAINER } from "@/lib/constants";

const HEADLINE_LINES = ["The planet", "is changing faster", "than we are."];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [planetProgress, setPlanetProgress] = useState(0);

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
        intro.fromTo(eyebrow, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.35);
      }

      intro.fromTo(
        headlineInners,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.35, stagger: 0.12 },
        0.5,
      );

      if (subline) {
        intro.fromTo(subline, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, 1);
      }

      if (scrollHint) {
        intro.fromTo(scrollHint, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 1.25);
      }

      gsap.to(contentRef.current, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(contentRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "55% top",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => setPlanetProgress(self.progress),
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-immersive"
      aria-labelledby="hero-heading"
    >
      <LazyPlanetCanvas
        scrollProgress={planetProgress}
        enableIntro={false}
        showStars
        planetScale={1.05}
        cameraZ={6.6}
        cameraX={0.35}
        scrollTurns={1.15}
        idleSpeed={0.022}
        className="hero-immersive__canvas"
      />

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
            A cinematic journey through the signals of a warming world.
          </p>
        </div>
      </Container>

      <ScrollHint className="hero-immersive__scroll-hint" />
    </section>
  );
}
