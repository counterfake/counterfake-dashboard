"use client";

import React from "react";
import { XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/primitives/select";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/ui/primitives/chart";
import MonthlyRiskyClosedProductsSkeleton from "./monthly-risky-closed-products-skeleton";
import MonthlyRiskyClosedProductsError from "./monthly-risky-closed-products-error";

interface MonthlySimpleChartProps {
  monthlyChartData: {
    month: string;
    riskyProducts: number;
    closedProducts: number;
  }[];
  riskyProductsTrend: number;
  closedProductsTrend: number;
  isLoading?: boolean;
  isError?: boolean;
  monthOptions: {
    value: number;
    label: string;
  }[];
  selectedMonth?: number;
  onMonthChange?: (month: number) => void;
}

const chartConfig = {
  riskyProducts: {
    label: "Risky Products",
    color: "oklch(var(--destructive))",
  },
  closedProducts: {
    label: "Closed Products",
    color: "oklch(var(--primary))",
  },
} satisfies ChartConfig;

export function MonthlyRiskyClosedProducts({
  monthlyChartData,
  riskyProductsTrend,
  closedProductsTrend,
  isLoading = false,
  isError = false,
  monthOptions,
  selectedMonth,
  onMonthChange,
}: MonthlySimpleChartProps) {
  const uid = React.useId().replace(/:/g, "");

  // Safari can return incorrect values in the first render measurement with ResponsiveContainer in some layout situations.
  // In this case, animated area charts may produce overflow/triangulation issues.
  const isSafari =
    typeof navigator !== "undefined" &&
    /safari/i.test(navigator.userAgent) &&
    !/chrome|crios|android/i.test(navigator.userAgent);

  // To prevent ID collisions when multiple charts are on the same page, generate unique IDs for <defs>.
  const gradientIds = React.useMemo(
    () => ({
      risky: `riskyProductsGradient-${uid}`,
      closed: `closedProductsGradient-${uid}`,
    }),
    [uid]
  );

  const isDataExists = monthlyChartData.length > 0;

  if (isLoading) return <MonthlyRiskyClosedProductsSkeleton />;
  if (isError) return <MonthlyRiskyClosedProductsError />;

  const riskyProductsTrendText =
    riskyProductsTrend > 0 ? (
      <>
        increased by
        <span className="text-success"> {riskyProductsTrend}</span>
      </>
    ) : (
      <>
        decreased by
        <span className="text-destructive"> {riskyProductsTrend}</span>
      </>
    );
  const closedProductsTrendText =
    closedProductsTrend > 0 ? (
      <>
        increased by
        <span className="text-success"> {closedProductsTrend}</span>
      </>
    ) : (
      <>
        decreased by
        <span className="text-destructive"> {closedProductsTrend}</span>
      </>
    );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center gap-4">
          <div className="space-y-1">
            <CardTitle>Products Monthly Trends</CardTitle>
            <CardDescription>
              Showing total risky & closed products from last 6 months
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
        <div>
          {isDataExists ? (
            <ChartContainer
              config={chartConfig}
              className="h-72 w-full overflow-hidden"
            >
              <AreaChart
                data={monthlyChartData}
                margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
              >
                <defs>
                  <linearGradient
                    id={gradientIds.closed}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={chartConfig.closedProducts.color}
                      stopOpacity={1}
                    />
                    <stop
                      offset="100%"
                      stopColor={chartConfig.closedProducts.color}
                      stopOpacity={0.6}
                    />
                  </linearGradient>
                  <linearGradient
                    id={gradientIds.risky}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={chartConfig.riskyProducts.color}
                      stopOpacity={0.7}
                    />
                    <stop
                      offset="100%"
                      stopColor={chartConfig.riskyProducts.color}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  type="category"
                  allowDuplicatedCategory={false}
                  tickMargin={8}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="riskyProducts"
                  stroke={chartConfig.riskyProducts.color}
                  fill={`url(#${gradientIds.risky})`}
                  strokeWidth={1.5}
                  isAnimationActive={!isSafari}
                />
                <Area
                  type="monotone"
                  dataKey="closedProducts"
                  stroke={chartConfig.closedProducts.color}
                  fill={`url(#${gradientIds.closed})`}
                  strokeWidth={2}
                  isAnimationActive={!isSafari}
                />
              </AreaChart>
            </ChartContainer>
          ) : (
            <div className="text-base text-muted-foreground h-full w-full flex items-center justify-center">
              No data available
            </div>
          )}
        </div>
      </CardContent>
      {isDataExists && (
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="w-full flex flex-col justify-center items-center gap-1 pt-4">
            <div className="text-base font-semibold">
              From the <span className="underline">last month</span>,{" "}
              {riskyProductsTrendText} in risky products,{" "}
              {closedProductsTrendText} in closed products
              <TrendingUp className="h-4 w-4 inline-block ml-2" />
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              Showing total risky & closed products for the last {selectedMonth}{" "}
              months
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
