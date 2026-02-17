"use client";

import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  LabelList
} from "recharts";

type Point = {
  time: string;
  temp: number;
};

type Props = {
  data: Point[];
};

const TemperatureChart = ({ data }: Props) => {
  return (
    <div style={{ width: "50%", height: 250, margin: "auto" }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
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
            interval={0}
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
            itemStyle={{
              color: "#333",
              fontSize: "14px",
            }}
            labelStyle={{
              color: "#888",
              fontSize: "12px",
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
  );
}

export default TemperatureChart;
