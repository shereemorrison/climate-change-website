export type TemperaturePoint = {
  year: number;
  anomaly: number;
};

/** Simplified global temperature anomaly (°C vs pre-industrial baseline). */
export const temperatureSeries: TemperaturePoint[] = [
  { year: 1880, anomaly: -0.17 },
  { year: 1900, anomaly: -0.08 },
  { year: 1920, anomaly: -0.14 },
  { year: 1940, anomaly: 0.04 },
  { year: 1960, anomaly: 0.03 },
  { year: 1980, anomaly: 0.2 },
  { year: 1990, anomaly: 0.35 },
  { year: 2000, anomaly: 0.55 },
  { year: 2010, anomaly: 0.72 },
  { year: 2015, anomaly: 0.95 },
  { year: 2020, anomaly: 1.1 },
  { year: 2023, anomaly: 1.22 },
];
