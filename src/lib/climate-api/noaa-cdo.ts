import type { TemperaturePoint } from "@/lib/climate-api/types";

const CDO_BASE = "https://www.ncei.noaa.gov/cdo-web/api/v2";
const CAG_GLOBAL_URL =
  "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/land_ocean/ytd/12";

type CagGlobalResponse = {
  description?: { base_period?: string };
  data?: Record<string, { departure: number }>;
};

/** Confirms the token is accepted by NOAA CDO (required before using NCEI live feeds). */
async function verifyNoaaCdoToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${CDO_BASE}/datasets?limit=1`, {
      headers: { token },
      next: { revalidate: 86400 },
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** NCEI Climate at a Glance — global land & ocean annual departures (NOAAGlobalTemp). */
async function fetchClimateAtAGlanceGlobalSeries(): Promise<TemperaturePoint[] | null> {
  const endYear = new Date().getFullYear();
  const url = `${CAG_GLOBAL_URL}/1880-${endYear}.json`;

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;

    const json = (await res.json()) as CagGlobalResponse;
    const entries = Object.entries(json.data ?? {});
    if (entries.length < 20) return null;

    const series = entries
      .map(([year, row]) => ({
        year: Number(year),
        anomaly: Math.round(row.departure * 100) / 100,
      }))
      .filter((p) => Number.isFinite(p.year) && Number.isFinite(p.anomaly))
      .sort((a, b) => a.year - b.year);

    return series.length >= 20 ? series : null;
  } catch {
    return null;
  }
}

/**
 * Global temperature anomalies when `NOAA_CDO_TOKEN` is set.
 * Token is validated against CDO v2; series comes from NCEI Climate at a Glance (NOAAGlobalTemp).
 */
export async function fetchNoaaGlobalTemperatureSeries(): Promise<TemperaturePoint[] | null> {
  const token = process.env.NOAA_CDO_TOKEN?.trim();
  if (!token) return null;

  const valid = await verifyNoaaCdoToken(token);
  if (!valid) return null;

  return fetchClimateAtAGlanceGlobalSeries();
}

export function noaaTemperatureCaption(basePeriod = "1901–2000"): string {
  return `Global land and ocean temperature departures (°C) vs ${basePeriod} · NOAA NCEI`;
}
