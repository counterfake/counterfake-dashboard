import { AlertTriangle } from "lucide-react";
import React from "react";

import { cn } from "@/common/lib/utils/ui";

interface SimpleErrorCardProps {
  title: string;
  description?: string;
  layout?: "vertical" | "horizontal";
  /**
   * Only works when layout is "horizontal".
   *
   * default: `center`
   */
  align?: "center" | "start" | "end";
  className?: string;
}

export default function SimpleErrorCard({
  title,
  description,
  layout = "horizontal",
  align = "center",
  className,
}: SimpleErrorCardProps) {
  return (
    <div className={cn("border border-border rounded-lg flex p-6", className)}>
      <div
        className={cn(
          "flex flex-1",
          layout === "vertical"
            ? "flex-col justify-center items-center text-center space-y-4"
            : "flex-row items-center space-x-4",
          layout === "horizontal" && align === "center" && "justify-center",
          layout === "horizontal" && align === "start" && "justify-start",
          layout === "horizontal" && align === "end" && "justify-end",
          layout === "vertical" && align === "center" && "justify-center",
          layout === "vertical" && align === "start" && "justify-start",
          layout === "vertical" && align === "end" && "justify-end"
        )}
      >
        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-accent">
            <AlertTriangle className="h-6 w-6 text-accent-foreground" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-lg font-semibold">{title}</div>
          {description && (
            <div className="text-sm text-muted-foreground">{description}</div>
          )}
        </div>
      </div>
    </div>
  );
}
