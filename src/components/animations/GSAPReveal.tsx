"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { cn } from "@/utils/cn";

type GSAPRevealProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
};

export function GSAPReveal({
  children,
  className,
  stagger = 0.08,
  y = 40,
}: GSAPRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = containerRef.current?.querySelectorAll("[data-reveal]");
      if (!targets?.length) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}
