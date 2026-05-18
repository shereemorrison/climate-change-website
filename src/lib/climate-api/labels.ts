import type { DataSource } from "@/lib/climate-api/types";

export function liveSignalsSourceLabel(source: string): string {
  return source === "openweather"
    ? "Live readings · OpenWeather"
    : "Sample conditions · illustrative city data";
}

export function temperatureSourceLabel(source: DataSource | string | null): string {
  switch (source) {
    case "noaa-cdo":
      return "NOAA NCEI · Climate at a Glance";
    case "nasa-power":
      return "NASA POWER API";
    default:
      return "Historical estimates";
  }
}

export function co2SourceLabel(
  source: string | null,
  indicator?: string,
): string {
  return source === "worldbank"
    ? (indicator ?? "World Bank Open Data")
    : "Illustrative emissions trend";
}

export function nasaEarthSourceLabel(source: string): string {
  return source === "nasa" ? "NASA EPIC · DSCOVR" : "Illustrative earth texture";
}
