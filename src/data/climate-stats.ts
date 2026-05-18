export type ClimateStat = {
  id: string;
  value: string;
  unit?: string;
  label: string;
  source: string;
};

export const climateStats: ClimateStat[] = [
  {
    id: "co2",
    value: "421",
    unit: "ppm",
    label: "Atmospheric CO₂ concentration (2024 average)",
    source: "NOAA Global Monitoring Laboratory",
  },
  {
    id: "temperature",
    value: "+1.2",
    unit: "°C",
    label: "Global surface temperature anomaly since pre-industrial",
    source: "IPCC AR6 Synthesis Report",
  },
  {
    id: "sea-level",
    value: "9–10",
    unit: "mm/yr",
    label: "Global mean sea level rise (1993–2023 trend)",
    source: "NASA Sea Level Change",
  },
  {
    id: "ice-loss",
    value: "427",
    unit: "Gt/yr",
    label: "Ice sheet mass loss (Greenland & Antarctica, 2011–2020)",
    source: "IPCC AR6",
  },
];
