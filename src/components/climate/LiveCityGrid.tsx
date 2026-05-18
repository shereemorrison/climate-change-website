"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import type { LiveCityReading } from "@/lib/climate-api/types";
import { GSAP_EASE, STAGGER } from "@/lib/motion";
import { cn } from "@/utils/cn";

type LiveCityGridProps = {
  cities: LiveCityReading[];
  className?: string;
};

export function LiveCityGrid({ cities, className }: LiveCityGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll("[data-live-card]");
      if (!cards?.length) return;

      gsap.fromTo(
        cards,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: STAGGER.base,
          ease: GSAP_EASE.cinematic,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: gridRef, dependencies: [cities] },
  );

  return (
    <div ref={gridRef} className={cn("live-grid", className)}>
      {cities.map((city) => (
        <article key={city.id} data-live-card className="live-card">
          <header className="live-card__header">
            <h3 className="live-card__city">{city.name}</h3>
            <span className="live-card__country">{city.country}</span>
          </header>
          <p className="live-card__temp">
            {city.tempC}
            <span className="live-card__unit">°C</span>
          </p>
          <p className="live-card__meta">
            Feels like {city.feelsLikeC}°C · {city.humidity}% humidity
          </p>
          <p className="live-card__desc">{city.description}</p>
        </article>
      ))}
    </div>
  );
}
