import { fallbackCo2Series } from "@/lib/climate-api/fallbacks";
import type { Co2Point } from "@/lib/climate-api/types";

type WorldBankRow = {
  date?: string;
  value: number | null;
};

export async function fetchGlobalCo2Series(): Promise<Co2Point[]> {
  try {
    const url =
      "https://api.worldbank.org/v2/country/WLD/indicator/EN.ATM.CO2E.KT?" +
      new URLSearchParams({
        format: "json",
        per_page: "80",
        date: "1990:2023",
      });

    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`World Bank ${res.status}`);

    const json = (await res.json()) as [unknown, WorldBankRow[]];
    const rows = json[1] ?? [];

    const points = rows
      .filter((r) => r.value != null && r.date)
      .map((r) => ({
        year: Number(r.date),
        value: r.value as number,
      }))
      .filter((p) => !Number.isNaN(p.year))
      .sort((a, b) => a.year - b.year);

    return points.length >= 4 ? points : fallbackCo2Series;
  } catch {
    return fallbackCo2Series;
  }
}

export function formatCo2Kt(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}B`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}M`;
  return value.toLocaleString();
}
