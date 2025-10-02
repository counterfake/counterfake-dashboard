import React from "react";

import { Skeleton } from "@/shared/ui/primitives/skeleton";

export function PageSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 max-w-[400px]" />
      <Skeleton className="h-6 max-w-[250px]" />
      <Skeleton className="h-24" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
      <Skeleton className="h-24" />
      <Skeleton className="h-32" />
    </div>
  );
}
