import { Skeleton } from "@/components/ui/primitives/skeleton";
import React from "react";

export default function MonthlyAnalysisStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-20 animate-pulse" />
      ))}
    </div>
  );
}
