"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/api/getWeather";
import TemperatureChart from "@/components/TemperatureForecast/TemperatureForecast";

import styles from '@/components/CityPageInfo/CityPageInfo.module.scss'
import LoaderComponent from "@/components/ui/LoaderComponent/LoaderComponent";

interface Props {
  slug: string;
}

const CityPageInfo = ({ slug }: Props) => {
  const [city, country] = slug.split("-");

  const { data, isLoading, error } = useQuery({
    queryKey: ["weather", city, country],
    queryFn: () => fetchWeather(city, country),
  });

  return (
    <main className={styles["city-page"]}>
      <div className={styles["city-page__container"]}>
        <h1 className={styles["city-page__title"]}>
          {city}, {country}
        </h1>

        {isLoading && <LoaderComponent />}
        {error && <p className={styles["city-page__status"]}>Error loading weather</p>}

        {data && (
          <>
            <div className={styles["city-page__weather"]}>
              <img
                className={styles["city-page__icon"]}
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                alt="weather icon"
              />

              <div className={styles["city-page__info"]}>
                <p className={styles["city-page__temp"]}>
                  {Math.round(data.main.temp)}°C
                </p>
                <p className={styles["city-page__description"]}>
                  {data.weather[0].description}
                </p>
              </div>
            </div>

            <div className={styles["city-page__chart"]}>
              <TemperatureChart city={city} country={country} />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default CityPageInfo;
