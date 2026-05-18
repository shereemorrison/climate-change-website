import { LIVE_CITIES } from "@/data/live-cities";
import { fallbackLiveCities } from "@/lib/climate-api/fallbacks";
import type { LiveCityReading } from "@/lib/climate-api/types";

type OpenWeatherResponse = {
  main: { temp: number; feels_like: number; humidity: number };
  weather: { description: string }[];
  wind: { speed: number };
  name: string;
};

async function fetchCity(
  apiKey: string,
  city: (typeof LIVE_CITIES)[number],
): Promise<LiveCityReading | null> {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?" +
    new URLSearchParams({
      lat: String(city.lat),
      lon: String(city.lon),
      appid: apiKey,
      units: "metric",
    });

  const res = await fetch(url, { next: { revalidate: 900 } });
  if (!res.ok) return null;

  const json = (await res.json()) as OpenWeatherResponse;
  return {
    id: city.id,
    name: city.name,
    country: city.country,
    tempC: Math.round(json.main.temp),
    feelsLikeC: Math.round(json.main.feels_like),
    humidity: json.main.humidity,
    description: json.weather[0]?.description ?? "—",
    windSpeedMs: Math.round(json.wind.speed * 10) / 10,
  };
}

export async function fetchLiveCityReadings(): Promise<{
  cities: LiveCityReading[];
  source: "openweather" | "fallback";
}> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return { cities: fallbackLiveCities, source: "fallback" };
  }

  const results = await Promise.all(
    LIVE_CITIES.map((city) => fetchCity(apiKey, city)),
  );

  const cities = results.filter((r): r is LiveCityReading => r != null);
  if (cities.length < 2) {
    return { cities: fallbackLiveCities, source: "fallback" };
  }

  return { cities, source: "openweather" };
}
