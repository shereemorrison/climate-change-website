import { fetchTemperatureSeries } from "@/lib/climate-api/temperature";
import type { ClimateApiResponse, TemperaturePoint } from "@/lib/climate-api/types";

export async function GET() {
  const { series, source, caption } = await fetchTemperatureSeries();

  const body: ClimateApiResponse<{
    series: TemperaturePoint[];
    caption: string;
  }> = {
    data: { series, caption },
    source,
    fetchedAt: new Date().toISOString(),
  };

  return Response.json(body);
}
