import { API_KEY, BASE_URL } from "@/lib/constants";
import { Forecast } from "@/types/Forecast";

export async function fetchForecast(city: string, country: string): Promise<Forecast> {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city},${country}&units=metric&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Forecast not found");
  }

  return response.json();
}
