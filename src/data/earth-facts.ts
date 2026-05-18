export type EarthFactAlign = "start" | "center" | "end";

export type EarthFact = {
  id: string;
  value: string;
  label: string;
  /*Show when scroll progress passes this threshold (0–1) */
  at: number;
  /* Horizontal position within the scatter area (0–100%) */
  x: number;
  /* Vertical position within the scatter area (0–100%) */
  y: number;
  align: EarthFactAlign;
};

export const earthFacts: EarthFact[] = [
  {
    id: "ocean",
    value: "71%",
    label: "of Earth's surface is ocean",
    at: 0.05,
    x: 4,
    y: 14,
    align: "start",
  },
  {
    id: "freshwater",
    value: "3%",
    label: "of water is fresh — mostly locked in ice",
    at: 0.1,
    x: 88,
    y: 10,
    align: "end",
  },
  {
    id: "biosphere",
    value: "1",
    label: "biosphere — no backup planet",
    at: 0.15,
    x: 34,
    y: 6,
    align: "center",
  },
  {
    id: "population",
    value: "8.1B",
    label: "people share one atmosphere",
    at: 0.22,
    x: 6,
    y: 38,
    align: "start",
  },
  {
    id: "co2",
    value: "421",
    label: "ppm CO₂ — higher than any point in human history",
    at: 0.28,
    x: 72,
    y: 28,
    align: "end",
  },
  {
    id: "atmosphere-depth",
    value: "10 km",
    label: "thick — the breathable shell we depend on",
    at: 0.34,
    x: 52,
    y: 22,
    align: "center",
  },
  {
    id: "warming",
    value: "+1.2°C",
    label: "above pre-industrial global temperature",
    at: 0.4,
    x: 10,
    y: 58,
    align: "start",
  },
  {
    id: "coral",
    value: "50%",
    label: "of coral reefs stressed by marine heatwaves",
    at: 0.46,
    x: 78,
    y: 48,
    align: "end",
  },
  {
    id: "ocean-heat",
    value: "90%",
    label: "of excess heat absorbed by the oceans",
    at: 0.52,
    x: 44,
    y: 44,
    align: "center",
  },
  {
    id: "wildfire",
    value: "2×",
    label: "increase in forest fire weather in some regions",
    at: 0.58,
    x: 62,
    y: 62,
    align: "end",
  },
  {
    id: "sea-level",
    value: "3.3mm",
    label: "per year — global mean sea level rise",
    at: 0.64,
    x: 22,
    y: 72,
    align: "start",
  },
  {
    id: "ice-loss",
    value: "427Gt",
    label: "ice lost yearly from Greenland & Antarctica",
    at: 0.72,
    x: 84,
    y: 70,
    align: "end",
  },
  {
    id: "species",
    value: "1M",
    label: "species at risk from climate pressures",
    at: 0.82,
    x: 8,
    y: 84,
    align: "start",
  },
  {
    id: "decade",
    value: "2030s",
    label: "the decisive decade for limiting long-term harm",
    at: 0.92,
    x: 54,
    y: 80,
    align: "center",
  },
];
