/** Shared motion tokens — documentary pacing, no bounce. */
export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT_SOFT = [0.33, 1, 0.42, 1] as const;
export const EASE_EDITORIAL = [0.25, 0.1, 0.25, 1] as const;

/** GSAP-compatible easing strings */
export const GSAP_EASE = {
  cinematic: "power3.out",
  soft: "power2.inOut",
  reveal: "power2.out",
  snap: "power4.out",
} as const;

export const DURATION = {
  fast: 0.45,
  base: 0.75,
  slow: 1.1,
  reveal: 1.25,
  counter: 1.85,
} as const;

export const VIEWPORT = {
  once: true,
  margin: "-10%",
} as const;

export const STAGGER = {
  tight: 0.06,
  base: 0.1,
  wide: 0.14,
} as const;
