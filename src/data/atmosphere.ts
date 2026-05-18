export const atmosphereNarrative = {
  lede: "Greenhouse gases trap heat that would otherwise escape to space. The result is warmer oceans, shifting rains, and seasons that no longer arrive on schedule.",
  paragraphs: [
    "Earth's atmosphere is vanishingly thin — yet this narrow band of air and moisture still holds the monsoons, winter cold, and harvest rhythms we have always known.",
    "For millennia, that envelope changed slowly. What is different now is the pace: heat-trapping gases are rising faster than at any point in at least 800,000 years.",
    "Oceans absorb most of the excess heat, stirring sea-level rise and stronger storms. Each layer of the system responds — and those responses feed back on one another.",
  ],
};

export type AtmosphereLayer = {
  id: string;
  name: string;
  detail: string;
  depth: string;
};

export const atmosphereLayers: AtmosphereLayer[] = [
  {
    id: "troposphere",
    name: "The air we breathe",
    detail:
      "Most weather lives here — where heat, moisture, and pollution concentrate, shifting rains and deepening droughts.",
    depth: "0–12 km",
  },
  {
    id: "oceans",
    name: "The ocean buffer",
    detail:
      "Seas absorb more than 90% of excess heat, slowing surface warming while reshaping currents and coastlines.",
    depth: "Surface to abyss",
  },
  {
    id: "cryosphere",
    name: "Ice as memory",
    detail:
      "Ice stores millennia of climate history and reflects sunlight back to space. As it retreats, darker surfaces absorb more heat.",
    depth: "Poles & peaks",
  },
];
