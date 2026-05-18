import { fetchGlobalCo2Series } from "@/lib/climate-api/worldbank";
import type { ClimateApiResponse, Co2Point } from "@/lib/climate-api/types";

export async function GET() {
  const series = await fetchGlobalCo2Series();

  const body: ClimateApiResponse<{
    series: Co2Point[];
    unit: string;
    indicator: string;
  }> = {
    data: {
      series,
      unit: "kt CO₂",
      indicator: "EN.ATM.CO2E.KT — World Bank, global total emissions",
    },
    source: series.length ? "worldbank" : "fallback",
    fetchedAt: new Date().toISOString(),
  };

  return Response.json(body);
}
