"use client";

import { useQuery } from "@tanstack/react-query";
import { Forecast } from "@/types/Forecast";
import { fetchForecast } from "@/lib/api/fetchForecast";
import { getNext24HoursForecast } from "@/lib/utils/getTodayForecast";
import { AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, LabelList } from "recharts";

import styles from "./TemperatureForecast.module.scss";

interface Props {
  city: string;
  country: string;
}

const TemperatureForecast = ({ city, country }: Props) => {
  const { data, isLoading, error } = useQuery<Forecast>({
    queryKey: ["forecast", city, country],
    queryFn: () => fetchForecast(city, country),
  });

  if (isLoading) return <p className={styles["forecast__status"]}>Loading forecast...</p>;

  if (error || !data) return <p className={styles["forecast__status"]}>Forecast error</p>;

  const forecastData = getNext24HoursForecast(data);

  return (
    <div className={styles["forecast"]}>
      <h3 className={styles["forecast__title"]}>Today hourly temperature</h3>

      <div className={styles["forecast__chart"]}>
        <ResponsiveContainer>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbc04" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#fbbc04" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              padding={{ left: 20, right: 20 }}
            />
            <YAxis hide />

            <Tooltip
              cursor={{ stroke: "#fbbc04", strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "8px 12px",
              }}
              formatter={(value) => [`${Math.round(Number(value))}°C`, "Temperature"]}
            />

            <Area
              type="monotone"
              dataKey="temp"
              stroke="#fbbc04"
              strokeWidth={3}
              fill="url(#colorTemp)"
              dot={false}
              activeDot={{ r: 6 }}
              baseValue="dataMin"
            >
              <LabelList
                dataKey="temp"
                position="top"
                formatter={(value) => `${Math.round(Number(value))}°`}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TemperatureForecast;
