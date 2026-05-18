export type DataSource =
  | "nasa"
  | "worldbank"
  | "openweather"
  | "nasa-power"
  | "noaa-cdo"
  | "fallback";

export type ClimateApiResponse<T> = {
  data: T;
  source: DataSource;
  fetchedAt: string;
};

export type TemperaturePoint = {
  year: number;
  anomaly: number;
};

export type Co2Point = {
  year: number;
  /** CO₂ emissions in kilotonnes (World Bank) */
  value: number;
};

export type LiveCityReading = {
  id: string;
  name: string;
  country: string;
  tempC: number;
  feelsLikeC: number;
  humidity: number;
  description: string;
  windSpeedMs: number;
};

export type NasaEarthImage = {
  date: string;
  caption: string;
  imageUrl: string;
};
