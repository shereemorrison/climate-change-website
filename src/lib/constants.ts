export const SITE_NAME = "Atlas of Change";
export const SITE_DESCRIPTION =
  "A cinematic data storytelling experience exploring the state of our climate.";

export const SECTION_SPACING = {
  sm: "py-16 md:py-24",
  md: "py-24 md:py-32",
  lg: "py-32 md:py-40 lg:py-48",
  xl: "py-40 md:py-52 lg:py-64",
} as const;

export const CONTAINER_WIDTH = {
  narrow: "max-w-3xl",
  default: "max-w-5xl",
  wide: "max-w-7xl",
  full: "max-w-[90rem]",
} as const;

/** Primary content rail — use for header, sections, and footer so edges align. */
export const PAGE_CONTAINER = "wide" as const;
