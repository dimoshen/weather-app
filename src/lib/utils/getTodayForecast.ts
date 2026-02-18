import { Forecast } from "@/types/Forecast";

export const getNext24HoursForecast = (data: Forecast) => {
  const now = new Date();
  const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  return data.list
    .filter((item) => {
      const forecastTime = new Date(item.dt_txt);
      return forecastTime >= now && forecastTime <= next24h;
    })
    .map((item) => ({
      time: item.dt_txt.split(" ")[1].slice(0, 5),
      temp: item.main.temp,
    }));
};
