// src/features/user-dashboard/dashboard-analytics/components/risky-platforms/risky-platforms-skeleton.tsx
import React from "react";
import { Skeleton } from "@/common/components/ui/primitives/skeleton";

export function RiskyPlatformsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="w-full h-60" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
    </div>
  );
}
