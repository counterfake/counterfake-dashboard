import React from "react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/primitives/chart";
import { PieChart, Pie, Cell, Sector } from "recharts";

export interface PieChartDataItem {
  fill?: string;
  [key: string]: any;
}

interface PieChartProps {
  data: PieChartDataItem[];
  dataKey: string;
  nameKey: string;
  className?: string;
  activeIndex?: number;
  activeShapeStroke?: string;
  tooltip?: (item: PieChartDataItem) => React.ReactNode;
  onItemHover?: (item: PieChartDataItem, index: number) => void;
  onItemLeave?: () => void;
  onItemClick?: (item: PieChartDataItem, index: number) => void;
}

const chartConfig = {
  primary: {
    label: "Primary",
    color: "oklch(var(--primary))",
  },
} satisfies ChartConfig;

export function InteractivePieChart({
  data,
  dataKey,
  nameKey,
  className,
  activeIndex,
  activeShapeStroke,
  tooltip,
  onItemHover,
  onItemLeave,
  onItemClick,
}: PieChartProps) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill:
      item.fill || `oklch(var(--primary) / ${1 - (index / data.length) * 0.8})`,
  }));

  const handleMouseEnter = (item: PieChartDataItem, index: number) => {
    if (onItemHover) {
      onItemHover(item, index);
    }
  };

  const handleMouseLeave = () => {
    if (onItemLeave) {
      onItemLeave();
    }
  };

  const handleClick = (item: PieChartDataItem, index: number) => {
    if (onItemClick) {
      onItemClick(item, index);
    }
  };

  return (
    <ChartContainer config={chartConfig} className={className}>
      <PieChart>
        <ChartTooltip
          content={
            !!tooltip ? (
              ({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return tooltip(data);
                }
                return null;
              }
            ) : (
              <ChartTooltipContent hideLabel />
            )
          }
        />
        <Pie
          data={chartData}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={50}
          outerRadius={80}
          activeIndex={activeIndex}
          activeShape={(props: any) => (
            <g>
              <Sector
                cx={props.cx}
                cy={props.cy}
                innerRadius={props.innerRadius}
                outerRadius={props.outerRadius + 12}
                startAngle={props.startAngle}
                endAngle={props.endAngle}
                fill={props.fill}
                stroke={props.stroke}
                strokeWidth={props.strokeWidth}
              />
            </g>
          )}
          onMouseEnter={(_, index) => handleMouseEnter(chartData[index], index)}
          onMouseLeave={handleMouseLeave}
          onClick={(data, index) => handleClick(chartData[index], index)}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.fill}
              stroke={activeIndex === index ? activeShapeStroke : "transparent"}
              strokeWidth={activeIndex === index ? 2 : 0}
            />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
