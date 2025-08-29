import { cn } from "@/lib/utils/ui";

import { DivideIcon as LucideIcon } from "lucide-react";

export interface SimpleStatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: typeof LucideIcon;
  className?: string;
}

export function SimpleStatsCard({
  title,
  value,
  description,
  icon: Icon,
  className,
}: SimpleStatsCardProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-muted text-primary rounded-xl flex items-center justify-center transition-all duration-200">
          <Icon className="w-4 h-4" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      </div>
      <p className="text-2xl font-bold text-foreground">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
