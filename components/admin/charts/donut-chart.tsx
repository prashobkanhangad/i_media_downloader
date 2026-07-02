"use client";

import { Cell, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { CountItem } from "@/server/types/analytics";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

interface DonutChartProps {
  data: CountItem[];
}

export function DonutChart({ data }: DonutChartProps) {
  const chartConfig = data.reduce<ChartConfig>((acc, item, index) => {
    acc[item.label] = {
      label: item.label,
      color: COLORS[index % COLORS.length],
    };
    return acc;
  }, {});

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[280px]"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="label" />} />
        <Pie
          data={data}
          dataKey="count"
          nameKey="label"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={entry.label} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
