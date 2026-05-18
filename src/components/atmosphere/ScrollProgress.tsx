"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollProgress() {
  const progress = useScrollProgress();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      className="scroll-progress"
      style={{ width: `${progress * 100}%` }}
    />
  );
}
