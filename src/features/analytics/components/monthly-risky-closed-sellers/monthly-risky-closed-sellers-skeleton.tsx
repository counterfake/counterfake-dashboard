import { Skeleton } from "@/components/ui/primitives/skeleton";
import React from "react";

export default function MonthlyRiskyClosedSellersSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-96 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
