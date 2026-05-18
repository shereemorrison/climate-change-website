import type { TemperaturePoint } from "@/lib/climate-api/types";

export function mergeTemperatureSeries(
  staticSeries: TemperaturePoint[],
  nasaSeries: TemperaturePoint[] | null,
): TemperaturePoint[] {
  if (!nasaSeries?.length) return staticSeries;

  const merged = staticSeries.filter((p) => p.year < 1980);
  const lastStatic = staticSeries[staticSeries.length - 1];
  const combined = [...merged, ...nasaSeries];

  if (lastStatic && lastStatic.year > (combined[combined.length - 1]?.year ?? 0)) {
    combined.push(lastStatic);
  }

  return combined.sort((a, b) => a.year - b.year);
}
