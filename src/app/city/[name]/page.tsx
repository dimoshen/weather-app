"use client";

import { use } from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchWeather} from "@/lib/api";

type Props = {
  params: Promise<{
    name: string;
  }>;
};

const CityPage = ({ params }: Props) => {
  const { name } = use(params);

  const { data, isLoading, error } = useQuery({
    queryKey: ["weather", name],
    queryFn: () => fetchWeather(name),
  });

  return (
    <div>
      <h1>City: {name}</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading weather</p>}
      {data && (
          <>
            <p>{data.main.temp}°C</p>
            <p>{data.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="weather icon"
              width={100}
              height={100}
            />
          </>
        )
      }
    </div>
  );
}

export default CityPage;
