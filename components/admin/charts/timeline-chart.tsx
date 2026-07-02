"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { TimelineItem } from "@/server/types/analytics";

const chartConfig = {
  pageViews: {
    label: "Page Views",
    color: "var(--chart-1)",
  },
  downloads: {
    label: "Downloads",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface TimelineChartProps {
  data: TimelineItem[];
}

export function TimelineChart({ data }: TimelineChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[300px] w-full"
    >
      <AreaChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={24}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="pageViews"
          type="monotone"
          fill="var(--color-pageViews)"
          fillOpacity={0.2}
          stroke="var(--color-pageViews)"
          stackId="a"
        />
        <Area
          dataKey="downloads"
          type="monotone"
          fill="var(--color-downloads)"
          fillOpacity={0.2}
          stroke="var(--color-downloads)"
          stackId="b"
        />
      </AreaChart>
    </ChartContainer>
  );
}
