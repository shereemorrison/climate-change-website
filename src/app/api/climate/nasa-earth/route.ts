import { fetchNasaEarthImage } from "@/lib/climate-api/nasa-epic";
import type { ClimateApiResponse, NasaEarthImage } from "@/lib/climate-api/types";

export async function GET() {
  const image = await fetchNasaEarthImage();
  const source = image.imageUrl.includes("epic1.gsfc.nasa.gov") ? "nasa" : "fallback";

  const body: ClimateApiResponse<NasaEarthImage> = {
    data: image,
    source,
    fetchedAt: new Date().toISOString(),
  };

  return Response.json(body);
}
