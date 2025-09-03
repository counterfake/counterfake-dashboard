import React from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/ui/primitives/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/primitives/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";

import MonthlyRiskyClosedSellersSkeleton from "./monthly-risky-closed-sellers-skeleton";
import MonthlyRiskyClosedSellersError from "./monthly-risky-closed-sellers-error";

const chartConfig = {
  riskySellers: {
    label: "Risky Sellers",
    color: "oklch(var(--chart-1))",
  },
  closedSellers: {
    label: "Closed Sellers",
    color: "oklch(var(--chart-10))",
  },
  label: {
    color: "oklch(var(--background))",
  },
} satisfies ChartConfig;

interface MonthlyRiskyClosedSellersProps {
  monthOptions: { value: number; label: string }[];
  selectedMonth: number;
  onMonthChange: (month: number) => void;
  riskySellersTrend: number;
  closedSellersTrend: number;
  monthlyChartData: {
    month: string;
    riskySellers: number;
    closedSellers: number;
  }[];
  isLoading: boolean;
  isError: boolean;
  className?: string;
}

export function MonthlyRiskyClosedSellers({
  monthOptions,
  selectedMonth,
  riskySellersTrend,
  closedSellersTrend,
  monthlyChartData,
  isLoading,
  isError,
  className = "",
  onMonthChange,
}: MonthlyRiskyClosedSellersProps) {
  if (isLoading)
    return (
      <div className={className}>
        <MonthlyRiskyClosedSellersSkeleton />
      </div>
    );
  if (isError)
    return (
      <div className={className}>
        <MonthlyRiskyClosedSellersError />
      </div>
    );

  const isDataExists = monthlyChartData.length > 0;

  let riskySellersTrendText = null;
  let closedSellersTrendText = null;

  switch (true) {
    case riskySellersTrend === 0:
      riskySellersTrendText = <>same as last month in risky sellers</>;
      break;
    case riskySellersTrend > 0:
      riskySellersTrendText = (
        <>
          increased by
          <span className="text-success"> {riskySellersTrend}</span> in risky
          sellers
        </>
      );
      break;
    case riskySellersTrend < 0:
      riskySellersTrendText = (
        <>
          decreased by
          <span className="text-destructive"> {riskySellersTrend}</span> in
          risky sellers
        </>
      );
      break;
    default:
      riskySellersTrendText = null;
      break;
  }

  switch (true) {
    case closedSellersTrend === 0:
      closedSellersTrendText = <>same as last month in closed sellers</>;
      break;
    case closedSellersTrend > 0:
      closedSellersTrendText = (
        <>
          increased by
          <span className="text-success"> {closedSellersTrend}</span> in closed
          sellers
        </>
      );
      break;
    case closedSellersTrend < 0:
      closedSellersTrendText = (
        <>
          decreased by
          <span className="text-destructive"> {closedSellersTrend}</span> in
          closed sellers
        </>
      );
      break;
    default:
      closedSellersTrendText = null;
      break;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center gap-4">
          <div className="space-y-1">
            <CardTitle>Sellers Monthly Trends</CardTitle>
            <CardDescription>
              Showing total risky & closed sellers from last 6 months
            </CardDescription>
          </div>
          <Select
            value={String(selectedMonth)}
            onValueChange={(value) => onMonthChange?.(Number(value))}
          >
            <SelectTrigger>
              <SelectValue
                placeholder="Select months"
                defaultValue={String(selectedMonth)}
              />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-full">
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={monthlyChartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="riskySellers"
                type="monotone"
                stroke={chartConfig.riskySellers.color}
                strokeWidth={2}
                dot={{
                  fill: chartConfig.riskySellers.color,
                  stroke: chartConfig.riskySellers.color,
                  strokeWidth: 2,
                }}
                activeDot={{
                  fill: chartConfig.riskySellers.color,
                  stroke: chartConfig.riskySellers.color,
                  strokeWidth: 2,
                }}
              />
              <Line
                dataKey="closedSellers"
                type="monotone"
                stroke={chartConfig.closedSellers.color}
                strokeWidth={2}
                dot={{
                  fill: chartConfig.closedSellers.color,
                  stroke: chartConfig.closedSellers.color,
                  strokeWidth: 2,
                }}
                activeDot={{
                  fill: chartConfig.closedSellers.color,
                  stroke: chartConfig.closedSellers.color,
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
      {isDataExists && (
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="w-full flex flex-col justify-center items-center text-center gap-1 pt-4">
            <div className="text-base font-semibold">
              From the <span className="underline">last month</span>,{" "}
              {riskySellersTrendText}, {closedSellersTrendText}
              <TrendingUp className="h-4 w-4 inline-block ml-2" />
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              Showing total risky & closed sellers for the last {selectedMonth}{" "}
              months
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
