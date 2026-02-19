"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/api/fetchWeather";
import { formatCityName } from "@/lib/utils/formatCityName";
import RefreshIcon from "@/components/icons/RefreshIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import LoaderComponent from "@/components/ui/LoaderComponent/LoaderComponent";
import { Weather } from "@/types/Weather";

import styles from "./CityCard.module.scss";

interface Props {
  id: string;
  city: string;
  country: string;
  onDelete: (id: string) => void;
}

const CityCard = ({ id, city, country, onDelete }: Props) => {
  const { data, isLoading, error, refetch } = useQuery<Weather>({
    queryKey: ["weather", city, country],
    queryFn: () => fetchWeather(city, country),
  });

  return (
    <div className={styles["city-card"]}>
      <h3 className={styles["city-card__title"]}>{`${city}, ${country}`}</h3>

      {isLoading && <LoaderComponent />}
      {error && <div className={styles["city-card__error"]}>Data not found</div>}

      {data && (
        <>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="weather icon"
            width={100}
            height={100}
          />
          <p className={styles["city-card__subtitle"]}>{Math.round(data.main.temp)}°C</p>
          <p className={styles["city-card__description"]}>
            {formatCityName(data.weather[0].description)}
          </p>
        </>
      )}
      <div className={styles["city-card__actions"]}>
        {error || isLoading ? (
          <span
            className={`${styles["city-card__button"]} ${styles["city-card__button--disabled"]}`}
          >
            Details
          </span>
        ) : (
          <Link
            href={`/city/${encodeURIComponent(`${city}-${country}`)}`}
            className={styles["city-card__button"]}
          >
            Details
          </Link>
        )}

        <div className={styles["city-card__icons"]}>
          <button
            onClick={() => refetch()}
            aria-label="Refresh weather"
            className={styles["city-card__refresh"]}
          >
            <RefreshIcon size={22} />
          </button>

          <button
            onClick={() => onDelete(id)}
            aria-label="Delete"
            className={styles["city-card__delete"]}
          >
            <DeleteIcon size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
