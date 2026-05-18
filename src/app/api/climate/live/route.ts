import { fetchLiveCityReadings } from "@/lib/climate-api/openweather";
import type { ClimateApiResponse, LiveCityReading } from "@/lib/climate-api/types";

export async function GET() {
  const { cities, source } = await fetchLiveCityReadings();

  const body: ClimateApiResponse<{ cities: LiveCityReading[] }> = {
    data: { cities },
    source,
    fetchedAt: new Date().toISOString(),
  };

  return Response.json(body);
}
