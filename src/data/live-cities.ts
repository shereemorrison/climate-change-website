export type LiveCityConfig = {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
};

export const LIVE_CITIES: LiveCityConfig[] = [
  { id: "london", name: "London", country: "UK", lat: 51.5074, lon: -0.1278 },
  { id: "lagos", name: "Lagos", country: "Nigeria", lat: 6.5244, lon: 3.3792 },
  { id: "mumbai", name: "Mumbai", country: "India", lat: 19.076, lon: 72.8777 },
  { id: "santiago", name: "Santiago", country: "Chile", lat: -33.4489, lon: -70.6693 },
];
