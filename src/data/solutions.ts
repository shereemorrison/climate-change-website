export type ClimateSolution = {
  id: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
};

export const climateSolutions: ClimateSolution[] = [
  {
    id: "renewables",
    title: "Renewable energy",
    description:
      "Solar and wind are now the cheapest sources of new electricity in most of the world — scaling them rapidly cuts emissions while creating jobs.",
    metric: "3×",
    metricLabel: "Capacity growth since 2015",
  },
  {
    id: "restoration",
    title: "Ecosystem restoration",
    description:
      "Protecting forests, wetlands, and soils pulls carbon from the atmosphere while safeguarding biodiversity and freshwater.",
    metric: "2.6",
    metricLabel: "Gt CO₂/yr sequestration potential",
  },
  {
    id: "efficiency",
    title: "Efficiency & electrification",
    description:
      "Smarter buildings, transport, and industry reduce demand — the fastest, most affordable climate lever we have.",
    metric: "40%",
    metricLabel: "Emissions cut possible by 2030",
  },
  {
    id: "policy",
    title: "Collective action",
    description:
      "Ambitious policy, transparent data, and community leadership turn scientific consensus into measurable progress.",
    metric: "195",
    metricLabel: "Nations in the Paris Agreement",
  },
];
