import React from "react";

import { Skeleton } from "@/components/ui/primitives/skeleton";

export default function ProductSkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div className="flex flex-col space-y-3" key={index}>
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
