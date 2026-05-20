"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "Jan",
    wealth: 400000,
  },

  {
    month: "Feb",
    wealth: 480000,
  },

  {
    month: "Mar",
    wealth: 620000,
  },

  {
    month: "Apr",
    wealth: 700000,
  },

  {
    month: "May",
    wealth: 860000,
  },

  {
    month: "Jun",
    wealth: 940000,
  },
];

export default function WealthTrendChart() {

  return (
    <div
      className="
        glass-card
        rounded-3xl
        p-6
        h-[420px]
      "
    >

      <div className="mb-8">

        <h2 className="text-2xl font-bold">

          Wealth Growth

        </h2>

        <p className="text-[var(--muted)] mt-2">

          Portfolio growth analytics

        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height="80%"
      >

        <LineChart data={data}>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="wealth"
            stroke="#3b82f6"
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}