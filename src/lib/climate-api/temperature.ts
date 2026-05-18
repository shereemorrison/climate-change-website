import { fallbackTemperatureSeries } from "@/lib/climate-api/fallbacks";
import { mergeTemperatureSeries } from "@/lib/climate-api/merge-series";
import { fetchNasaPowerTemperature } from "@/lib/climate-api/nasa-power";
import {
  fetchNoaaGlobalTemperatureSeries,
  noaaTemperatureCaption,
} from "@/lib/climate-api/noaa-cdo";
import type { DataSource, TemperaturePoint } from "@/lib/climate-api/types";

export async function fetchTemperatureSeries(): Promise<{
  series: TemperaturePoint[];
  source: DataSource;
  caption: string;
}> {
  const noaa = await fetchNoaaGlobalTemperatureSeries();
  if (noaa?.length) {
    return {
      series: noaa,
      source: "noaa-cdo",
      caption: noaaTemperatureCaption(),
    };
  }

  const nasa = await fetchNasaPowerTemperature();
  if (nasa?.length) {
    return {
      series: mergeTemperatureSeries(fallbackTemperatureSeries, nasa),
      source: "nasa-power",
      caption:
        "Temperature anomaly derived from NASA POWER (0°N, 0°E) vs 1951–1980 baseline, merged with historical estimates",
    };
  }

  return {
    series: fallbackTemperatureSeries,
    source: "fallback",
    caption: "Global surface temperature anomaly (°C) · illustrative trend",
  };
}
