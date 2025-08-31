import { Skeleton } from "@/components/ui/primitives/skeleton";
import React from "react";

export default function MonthlyRiskyClosedProductsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-72 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}
