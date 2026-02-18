import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/api/weather";
import { Weather } from "@/types/Weather";
import RefreshIcon from "@/components/icons/RefreshIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import {formatCityName} from "@/lib/utils/formatCityName";

import styles from "./CityCard.module.scss";

interface Props {
  id: string;
  name: string;
  onDelete: (id: string) => void;
}

const CityCard = ({ id, name, onDelete }: Props) => {
  const { data, isLoading, error, refetch } = useQuery<Weather>({
    queryKey: ['weather', name],
    queryFn: () => fetchWeather(name),
  });

  return (
    <div className={styles['city-card']}>
      <h3 className={styles['city-card__title']}>{name}</h3>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading weather</p>}

      {data && (
        <>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt='weather icon'
            width={100}
            height={100}
          />
          <p className={styles['city-card__subtitle']}>
            {Math.round(data.main.temp)}°C
          </p>
          <p className={styles['city-card__description']}>
            {formatCityName(data.weather[0].description)}
          </p>
        </>
      )}

      <div className={styles['city-card__actions']}>
        <Link
          href={`/city/${name}`}
          className={styles['city-card__button']}
        >
          Details
        </Link>

        <div className={styles['city-card__icons']}>
          <button
            onClick={() => refetch()}
            aria-label='Refresh weather'
            className={styles['city-card__refresh']}
          >
            <RefreshIcon size={22} />
          </button>

          <button
            onClick={() => onDelete(id)}
            aria-label='Delete'
            className={styles['city-card__delete']}
          >
            <DeleteIcon size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
