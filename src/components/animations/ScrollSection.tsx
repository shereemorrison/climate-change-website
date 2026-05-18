"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { cn } from "@/utils/cn";

type ScrollSectionProps = {
  children: React.ReactNode;
  className?: string;
  pin?: boolean;
  scrub?: boolean | number;
};

/** Pinned scroll section with optional scrubbed parallax. */
export function ScrollSection({
  children,
  className,
  pin = false,
  scrub = 1,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const parallax = sectionRef.current.querySelector("[data-parallax]");
      if (!parallax) return;

      gsap.fromTo(
        parallax,
        { y: 60, opacity: 0.6 },
        {
          y: -60,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: typeof scrub === "boolean" ? (scrub ? 1 : false) : scrub,
            pin,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [pin, scrub] },
  );

  return (
    <div ref={sectionRef} className={cn("relative w-full", className)}>
      {children}
    </div>
  );
}
