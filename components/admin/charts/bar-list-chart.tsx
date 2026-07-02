"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { CountItem } from "@/server/types/analytics";

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

interface BarListChartProps {
  data: CountItem[];
  title?: string;
}

export function BarListChart({ data }: BarListChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[280px] w-full"
    >
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 12 }}>
        <CartesianGrid horizontal={false} />
        <XAxis type="number" hide />
        <YAxis
          dataKey="label"
          type="category"
          width={100}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: string) =>
            value.length > 14 ? `${value.slice(0, 14)}…` : value
          }
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
