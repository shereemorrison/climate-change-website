"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { TemperatureChart } from "@/components/animations/TemperatureChart";
import { ParallaxLayers } from "@/components/animations/ParallaxLayers";
import { Container } from "@/components/layout/Container";
import { PAGE_CONTAINER } from "@/lib/constants";
import { climateStats } from "@/data/climate-stats";
import { GSAP_EASE, STAGGER } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { temperatureSourceLabel } from "@/lib/climate-api/labels";
import { useClimateData } from "@/hooks/climate/useClimateData";
import type { TemperaturePoint } from "@/lib/climate-api/types";

type TemperatureApiData = {
  series: TemperaturePoint[];
  caption: string;
};

export function TemperatureStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { data, source, loading } = useClimateData<TemperatureApiData>("temperature");

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const grid = section.querySelector(".story-section__grid");
      const revealItems = section.querySelectorAll("[data-story-reveal]");
      const cards = section.querySelectorAll("[data-story-card]");

      if (grid && revealItems.length) {
        gsap.fromTo(
          revealItems,
          { y: 56, opacity: 0.2 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            stagger: 0.14,
            scrollTrigger: {
              trigger: grid,
              start: "top 88%",
              end: "top 32%",
              scrub: 1.8,
            },
          },
        );
      }

      gsap.fromTo(
        cards,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: STAGGER.base,
          ease: GSAP_EASE.cinematic,
          scrollTrigger: {
            trigger: cards[0],
            start: "top 88%",
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
      id="story"
      className="story-section"
      aria-labelledby="story-heading"
    >
      <ParallaxLayers />

      <Container width={PAGE_CONTAINER}>
        <div className="story-section__grid">
          <div className="story-section__lead">
            <p className="story-section__eyebrow" data-story-reveal>
              The acceleration
            </p>
            <h2 id="story-heading" className="story-section__headline" data-story-reveal>
              A warming world, measured in decades
            </h2>
            <p className="story-section__lede" data-story-reveal>
              What once unfolded over millennia is now visible within a single lifetime —
              in thermometers, ice cores, and the lived experience of communities worldwide.
            </p>
            <div className="story-section__hero-stat" data-story-reveal>
              <span className="story-section__stat-value">
                <AnimatedCounter value={1.2} decimals={1} prefix="+" suffix="°C" />
              </span>
              <span className="story-section__stat-label">
                above pre-industrial levels — and rising
              </span>
            </div>
          </div>

          <div className="story-section__viz" data-story-reveal>
            <TemperatureChart
              series={data?.series}
              caption={data?.caption}
              loading={loading}
            />
            {source && !loading && (
              <p className="story-section__api-source">
                {temperatureSourceLabel(source)}
              </p>
            )}
          </div>
        </div>

        <div className="story-section__cards">
          {climateStats.map((stat, index) => (
            <article key={stat.id} data-story-card className={cn("story-card")}>
              <span className="story-card__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="story-card__value">
                {stat.value}
                {stat.unit && (
                  <span className="story-card__value-unit"> {stat.unit}</span>
                )}
              </p>
              <p className="story-card__label">{stat.label}</p>
              <p className="story-card__source">{stat.source}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
