"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { GSAP_EASE, DURATION } from "@/lib/motion";
import { cn } from "@/utils/cn";

type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
};

export function AnimatedCounter({
  value,
  decimals = 1,
  prefix = "",
  suffix = "",
  className,
  duration = DURATION.counter,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const state = { val: 0 };
      gsap.to(state, {
        val: value,
        duration,
        ease: GSAP_EASE.reveal,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = `${prefix}${state.val.toFixed(decimals)}${suffix}`;
        },
      });
    },
    { scope: ref, dependencies: [value, decimals, prefix, suffix, duration] },
  );

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
