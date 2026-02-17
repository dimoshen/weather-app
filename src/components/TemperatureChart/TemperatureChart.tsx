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
              <stop offset="0%" stopColor="#4285F4" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#4285F4" stopOpacity={0} />
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

          <Tooltip />

          <Area
            type="monotone"
            dataKey="temp"
            stroke="#4285F4"
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
