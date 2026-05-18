"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { nasaEarthSourceLabel } from "@/lib/climate-api/labels";
import type { NasaEarthImage } from "@/lib/climate-api/types";
import { cn } from "@/utils/cn";

type NasaEarthPanelProps = {
  earth: NasaEarthImage;
  source: string;
  className?: string;
};

export function NasaEarthPanel({ earth, source, className }: NasaEarthPanelProps) {
  const panelRef = useRef<HTMLElement>(null);
  const isExternal = earth.imageUrl.startsWith("http");

  useGSAP(
    () => {
      const img = panelRef.current?.querySelector("[data-nasa-img]");
      if (!img) return;

      gsap.fromTo(
        img,
        { scale: 1.08, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: panelRef },
  );

  return (
    <figure ref={panelRef} className={cn("nasa-earth-panel", className)}>
      <div className="nasa-earth-panel__frame" data-nasa-img>
        <Image
          src={earth.imageUrl}
          alt="Earth from space"
          fill
          className="nasa-earth-panel__image"
          sizes="(max-width: 900px) 100vw, 80vw"
          unoptimized={isExternal}
          priority={false}
        />
        <div className="nasa-earth-panel__shade" aria-hidden />
      </div>
      <figcaption className="nasa-earth-panel__caption">
        <span className="nasa-earth-panel__date">{earth.date}</span>
        <span className="nasa-earth-panel__text">{earth.caption}</span>
        <span className="nasa-earth-panel__source">
          {nasaEarthSourceLabel(source)}
        </span>
      </figcaption>
    </figure>
  );
}
