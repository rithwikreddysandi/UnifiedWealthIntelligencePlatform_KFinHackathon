"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Props {
  equities: number;

  mutualFunds: number;

  realEstate: number;
}

export default function AssetAllocationChart({
  equities,
  mutualFunds,
  realEstate,
}: Props) {

  const data = [
    {
      name: "Equities",
      value: equities,
    },

    {
      name: "Mutual Funds",
      value: mutualFunds,
    },

    {
      name: "Real Estate",
      value: realEstate,
    },
  ];

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
  ];

  return (
    <div className="glass-card rounded-3xl p-6 h-[420px]">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          Asset Allocation

        </h2>

        <p className="text-[var(--muted)] mt-2">

          Portfolio distribution

        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height="85%"
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={130}
            innerRadius={70}
            paddingAngle={4}
          >

            {data.map(
              (_entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />
              )
            )}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}