import React from "react";
import { cn } from "@/lib/utils/ui";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { InteractivePieChart } from "@/components/ui/data-display/charts/interactive-pie-chart";
import { Button } from "@/components/ui/primitives/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/primitives/tooltip";

import { RiskyPlatformsSkeleton } from "./risky-platforms-skeleton";
import RiskyPlatformsError from "./risky-platforms-error";

interface RiskyPlatformsProps {
  monthlyChartData: {
    platform: string;
    product: number;
  }[];
  isLoading: boolean;
  isError: boolean;
}

export function RiskyPlatforms({
  monthlyChartData,
  isLoading,
  isError,
}: RiskyPlatformsProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(
    undefined
  );

  if (isLoading) {
    return <RiskyPlatformsSkeleton />;
  }

  if (isError) {
    return <RiskyPlatformsError />;
  }

  const isDataExists = monthlyChartData.length > 0;

  const chartDataWithColors = monthlyChartData.map((item, index) => ({
    ...item,
    fill: `oklch(var(--primary) / ${
      1 - (index / monthlyChartData.length) * 0.8
    })`,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risky Platforms</CardTitle>
        <CardDescription>
          Risky platforms are the platforms that have the most fake products.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isDataExists ? (
          <div>
            <div className="w-full h-60">
              <InteractivePieChart
                data={chartDataWithColors}
                dataKey="product"
                nameKey="platform"
                activeIndex={activeIndex}
                className="mx-auto w-full h-full"
                onItemHover={(data, index) => setActiveIndex(index)}
                onItemLeave={() => setActiveIndex(undefined)}
              />
            </div>
            <div className="flex justify-center flex-wrap items-center gap-2">
              {chartDataWithColors.map((item, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-[1_1_150px] w-full max-w-[200px] flex justify-start items-center gap-2 px-4 py-2 rounded-full",
                        activeIndex === index && "ring-2 ring-primary"
                      )}
                      onClick={() => setActiveIndex(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(undefined)}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      <p className="text-sm truncate">
                        <span className="text-muted-foreground">
                          {index + 1}.
                        </span>{" "}
                        <span>{item.platform}</span>{" "}
                        <span className="text-xs text-muted-foreground">
                          ({item.product})
                        </span>
                      </p>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{item.product} risky product</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-60 flex items-center justify-center">
            <p className="text-center text-muted-foreground">
              No data available
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
