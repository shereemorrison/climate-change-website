import type { EarthFact } from "@/data/earth-facts";
import { getFactMotion, type FactMotion } from "@/lib/earth-motion";

/* Dive scroll phases (0–1) */
export const DIVE_PHASE = {
  settleEnd: 0.06,
  zoomInEnd: 0.34,
  factsStart: 0.34,
  factsEnd: 0.5,
  zoomOutStart: 0.5,
  zoomOutEnd: 0.94,
} as const;

/** Pin scroll length — keep the post-zoom “earth only” tail short */
export const DIVE_PIN_SCROLL = "+=108%";

export type DiveEarthHandoff = {
  x: number;
  y: number;
  size: number;
  opacity: number;
};

export type DiveEarthTransform = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  cameraT: number;
};

export type DiveContentStyle = {
  opacity: number;
  scale: number;
  y: number;
};

const DIVE_CENTER = { x: 50, y: 48 };

function clamp01(t: number) {
  return Math.max(0, Math.min(1, t));
}

function smoothstep(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** 0 at zoom-out start → 1 at zoom-out end */
export function diveZoomOutT(progress: number): number {
  if (progress < DIVE_PHASE.zoomOutStart) return 0;
  if (progress >= DIVE_PHASE.zoomOutEnd) return 1;
  return smoothstep(
    (progress - DIVE_PHASE.zoomOutStart) /
      (DIVE_PHASE.zoomOutEnd - DIVE_PHASE.zoomOutStart),
  );
}

/* Title + facts — one opacity/scale curve so they fade out together */
export function getDiveContentStyle(progress: number): DiveContentStyle {
  if (progress < DIVE_PHASE.zoomInEnd) {
    return { opacity: 0, scale: 1, y: 0 };
  }

  const outT = diveZoomOutT(progress);

  return {
    opacity: outT > 0 ? lerp(1, 0, smoothstep(outT)) : 1,
    scale: lerp(1, 0.2, outT),
    y: outT * 24,
  };
}

export function diveFillSizePx(): number {
  if (typeof window === "undefined") return 900;
  const { innerWidth: w, innerHeight: h } = window;
  return Math.max(w, h) * 1.18;
}

export function diveToFactsProgress(diveProgress: number): number {
  const { factsStart, factsEnd } = DIVE_PHASE;
  if (diveProgress < factsStart) return 0;
  if (diveProgress > factsEnd) return 1;
  return (diveProgress - factsStart) / (factsEnd - factsStart);
}

export function getDiveFactMotion(diveProgress: number, fact: EarthFact): FactMotion {
  return getFactMotion(diveToFactsProgress(diveProgress), fact);
}

export function getDiveEarthTransform(
  progress: number,
  handoff: DiveEarthHandoff,
  exitTarget: DiveEarthHandoff,
): DiveEarthTransform {
  const fill = diveFillSizePx();
  const holdOpacity = 0.92;
  const { settleEnd, zoomInEnd, zoomOutStart, zoomOutEnd } = DIVE_PHASE;

  if (progress <= 0) {
    return {
      x: handoff.x,
      y: handoff.y,
      size: handoff.size,
      opacity: handoff.opacity,
      cameraT: 0,
    };
  }

  if (progress < settleEnd) {
    return {
      x: handoff.x,
      y: handoff.y,
      size: handoff.size,
      opacity: handoff.opacity,
      cameraT: 0,
    };
  }

  if (progress < zoomInEnd) {
    const t = smoothstep((progress - settleEnd) / (zoomInEnd - settleEnd));
    return {
      x: lerp(handoff.x, DIVE_CENTER.x, t),
      y: lerp(handoff.y, DIVE_CENTER.y, t),
      size: lerp(handoff.size, fill, t),
      opacity: lerp(handoff.opacity, holdOpacity, t),
      cameraT: t,
    };
  }

  if (progress < zoomOutStart) {
    return {
      x: DIVE_CENTER.x,
      y: DIVE_CENTER.y,
      size: fill,
      opacity: holdOpacity,
      cameraT: 1,
    };
  }

  if (progress < zoomOutEnd) {
    const t = diveZoomOutT(progress);
    return {
      x: lerp(DIVE_CENTER.x, exitTarget.x, t),
      y: lerp(DIVE_CENTER.y, exitTarget.y, t),
      size: lerp(fill, exitTarget.size, t),
      opacity: lerp(holdOpacity, exitTarget.opacity, t),
      cameraT: lerp(1, 0, t),
    };
  }

  return {
    x: exitTarget.x,
    y: exitTarget.y,
    size: exitTarget.size,
    opacity: exitTarget.opacity,
    cameraT: 0,
  };
}

export function diveScrimOpacity(progress: number): number {
  if (progress < DIVE_PHASE.factsStart - 0.04) return 0;
  if (progress < DIVE_PHASE.factsStart + 0.06) {
    return smoothstep((progress - (DIVE_PHASE.factsStart - 0.04)) / 0.1);
  }
  if (progress < DIVE_PHASE.zoomOutStart) return 1;
  return lerp(1, 0, diveZoomOutT(progress));
}
