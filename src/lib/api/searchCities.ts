import { API_KEY } from "@/lib/constants";
import { CitySuggestion } from "@/types/CitySuggestion";

export async function searchCities(query: string): Promise<CitySuggestion[]> {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cities");
  }

  return response.json();
}
