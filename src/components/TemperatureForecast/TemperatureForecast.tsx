import {useQuery} from "@tanstack/react-query";
import {Forecast} from "@/types/Forecast";
import {fetchForecast} from "@/lib/api/getForecast";
import {getNext24HoursForecast} from "@/lib/utils/getTodayForecast";
import TemperatureChart from "@/components/TemperatureChart/TemperatureChart";

interface Props {
  city: string;
}

const TemperatureForecast = ({ city }: Props) => {
  const { data, isLoading, error} = useQuery<Forecast>(
    {
      queryKey: ["forecast", city],
      queryFn: () => fetchForecast(city),
    }
  )

  if (isLoading) return <p>Loading forecast...</p>;
  if (error || !data) return <p>Forecast error</p>;

  const forecastData = getNext24HoursForecast(data);

  return (
    <div>
      <h3>Today hourly temperature</h3>
      <TemperatureChart data={forecastData} />
    </div>
  )
}

export default TemperatureForecast;
