import type { TemperaturePoint } from "@/lib/climate-api/types";

/** NASA POWER monthly temperature — enriches recent years when available. */
export async function fetchNasaPowerTemperature(): Promise<TemperaturePoint[] | null> {
  try {
    const res = await fetch(
      "https://power.larc.nasa.gov/api/temporal/monthly/point?" +
        new URLSearchParams({
          parameters: "T2M",
          community: "RE",
          longitude: "0",
          latitude: "0",
          start: "198001",
          end: "202312",
          format: "JSON",
        }),
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return null;

    const json = (await res.json()) as {
      properties?: { parameter?: { T2M?: Record<string, number> } };
    };
    const t2m = json.properties?.parameter?.T2M;
    if (!t2m) return null;

    const byYear = new Map<number, number[]>();
    for (const [key, value] of Object.entries(t2m)) {
      if (value <= -900) continue;
      const year = Number(key.slice(0, 4));
      const arr = byYear.get(year) ?? [];
      arr.push(value);
      byYear.set(year, arr);
    }

    const baselineYears = [1951, 1960, 1970, 1980];
    const baselineVals = baselineYears
      .flatMap((y) => byYear.get(y) ?? [])
      .filter(Boolean);
    const baseline =
      baselineVals.length > 0
        ? baselineVals.reduce((a, b) => a + b, 0) / baselineVals.length
        : 14.5;

    const points: TemperaturePoint[] = [];
    for (const [year, vals] of byYear) {
      if (year < 1980 || vals.length < 6) continue;
      const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
      points.push({ year, anomaly: Math.round((mean - baseline) * 100) / 100 });
    }

    return points.length >= 8 ? points.sort((a, b) => a.year - b.year) : null;
  } catch {
    return null;
  }
}
