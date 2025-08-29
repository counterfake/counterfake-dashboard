import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils/ui";

import { Card, CardContent, CardFooter } from "@/components/ui/primitives/card";

import IconBox from "../icon-box";

const statsCardVariants = cva(
  "relative overflow-hidden transition-all duration-300",
  {
    variants: {
      size: {
        default: "",
        sm: "text-sm",
        lg: "p-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface StatsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statsCardVariants> {
  title: string;
  value: string | number;
  icon?: React.JSX.ElementType;
  description?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  loading?: boolean;
  footer?: React.ReactNode;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  size = "default",
  className,
  footer,
  ...props
}: StatsCardProps) {
  return (
    <Card className={cn(statsCardVariants({ size }), className)} {...props}>
      <CardContent className="pb-4 space-y-1">
        <div className="flex flex-row items-center justify-between space-y-0 pt-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-xl font-semibold text-foreground">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
          </div>
          {!!Icon && <IconBox icon={Icon} />}
        </div>
        <div className="space-y-1">
          {trend && (
            <div className="text-sm text-muted-foreground">
              <span
                className={cn(
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? (
                  <TrendingUp className="w-4 h-4 inline-block mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 inline-block mr-1" />
                )}
                {trend.isPositive ? "+" : ""}
                {trend.value}
              </span>{" "}
              from the last month
            </div>
          )}
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </CardContent>
      {!!footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
