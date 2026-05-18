import type { Co2Point, LiveCityReading, NasaEarthImage, TemperaturePoint } from "@/lib/climate-api/types";

export const fallbackTemperatureSeries: TemperaturePoint[] = [
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

export const fallbackCo2Series: Co2Point[] = [
  { year: 1990, value: 22_700_000 },
  { year: 1995, value: 23_400_000 },
  { year: 2000, value: 25_100_000 },
  { year: 2005, value: 28_200_000 },
  { year: 2010, value: 31_500_000 },
  { year: 2015, value: 33_500_000 },
  { year: 2020, value: 34_800_000 },
];

export const fallbackLiveCities: LiveCityReading[] = [
  {
    id: "london",
    name: "London",
    country: "UK",
    tempC: 11,
    feelsLikeC: 9,
    humidity: 78,
    description: "Overcast",
    windSpeedMs: 4.2,
  },
  {
    id: "lagos",
    name: "Lagos",
    country: "Nigeria",
    tempC: 29,
    feelsLikeC: 32,
    humidity: 82,
    description: "Humid",
    windSpeedMs: 2.8,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    tempC: 31,
    feelsLikeC: 35,
    humidity: 71,
    description: "Haze",
    windSpeedMs: 3.1,
  },
  {
    id: "santiago",
    name: "Santiago",
    country: "Chile",
    tempC: 18,
    feelsLikeC: 17,
    humidity: 45,
    description: "Clear",
    windSpeedMs: 5.5,
  },
];

export const fallbackNasaEarth: NasaEarthImage = {
  date: new Date().toISOString().slice(0, 10),
  caption: "Earth from space — illustrative view",
  imageUrl: "/textures/earth/earth-day.jpg",
};
