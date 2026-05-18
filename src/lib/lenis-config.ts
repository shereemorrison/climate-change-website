import type Lenis from "lenis";

/** ScrollTrigger scroller when Lenis smooth-scroll is active */
export function getLenisScroller(): HTMLElement | undefined {
  if (typeof document === "undefined") return undefined;
  return document.documentElement;
}

export const defaultLenisOptions: ConstructorParameters<typeof Lenis>[0] = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
};
