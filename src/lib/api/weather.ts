import {API_KEY, BASE_URL} from "@/lib/constants";
import {Weather} from "@/types/Weather";

export async function fetchWeather(city: string): Promise<Weather> {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&lang=ua&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json();
}
