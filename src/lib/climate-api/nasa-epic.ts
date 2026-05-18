import { fallbackNasaEarth } from "@/lib/climate-api/fallbacks";
import type { NasaEarthImage } from "@/lib/climate-api/types";

const NASA_KEY = process.env.NASA_API_KEY ?? "DEMO_KEY";

type EpicImage = {
  date: string;
  image: string;
  caption?: string;
};

function epicImageUrl(item: EpicImage): string {
  const datePart = item.date.split(" ")[0];
  const [year, month, day] = datePart.split("-");
  return `https://epic1.gsfc.nasa.gov/archive/natural/${year}/${Number(month)}/${Number(day)}/png/${item.image}.png`;
}

export async function fetchNasaEarthImage(): Promise<NasaEarthImage> {
  try {
    const res = await fetch(
      `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_KEY}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error(`EPIC ${res.status}`);

    const images = (await res.json()) as EpicImage[];
    const latest = images[0];
    if (!latest) throw new Error("No EPIC images");

    return {
      date: latest.date.split(" ")[0],
      caption: latest.caption ?? "Earth as seen from the DSCOVR satellite",
      imageUrl: epicImageUrl(latest),
    };
  } catch {
    return fallbackNasaEarth;
  }
}
