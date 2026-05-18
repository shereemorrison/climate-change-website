import type { EarthFact } from "@/data/earth-facts";

function smoothstep(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

export type FactMotion = {
  opacity: number;
  scale: number;
  y: number;
  blur: number;
  visible: boolean;
};

/* Scroll-driven motion for fact cards — zoom-in or fall-from-above. */
export function getFactMotion(progress: number, fact: EarthFact): FactMotion {
  const window = 0.11;
  const start = fact.at - window * 0.35;
  const end = fact.at + window;
  const raw = (progress - start) / (end - start);
  const t = smoothstep(raw);
  const visible = progress >= start - 0.02;

  if (fact.variant === "zoom") {
    return {
      visible,
      opacity: t,
      scale: 0.2 + t * 0.8,
      y: (1 - t) * -56,
      blur: (1 - t) * 10,
    };
  }

  return {
    visible,
    opacity: t,
    scale: 0.7 + t * 0.3,
    y: (1 - t) * -140,
    blur: (1 - t) * 6,
  };
}
