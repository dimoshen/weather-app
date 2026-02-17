import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/api";
import { WeatherResponse } from "@/types/WeatherResponse";

type Props = {
  id: string;
  name: string;
  onDelete: (id: string) => void;
};

const CityCard = ({ id, name, onDelete }: Props) => {
  const { data, isLoading, error, refetch } = useQuery<WeatherResponse>({
    queryKey: ["weather", name],
    queryFn: () => fetchWeather(name),
  });

  return (
    <div>
      <h3>{name}</h3>

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
      )}

      <button onClick={() => refetch()}>Refresh</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default CityCard;
