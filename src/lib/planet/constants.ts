/** Self-hosted planet maps (from three.js examples). */
export const PLANET_TEXTURES = {
  day: "/textures/earth/earth-day.jpg",
  topology: "/textures/earth/earth-topology.png",
  clouds: "/textures/earth/earth-clouds.png",
} as const;

export const PLANET_COLORS = {
  atmosphere: "#6fa88a",
  atmosphereInner: "#3d6b5c",
} as const;

export const PLANET_ROTATION = {
  scrollTurns: 0.72,
  idleSpeed: 0.014,
} as const;
