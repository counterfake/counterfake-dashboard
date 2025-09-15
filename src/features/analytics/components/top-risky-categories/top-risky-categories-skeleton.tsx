import React from "react";

import { Skeleton } from "@/common/components/ui/primitives/skeleton";

export default function TopRiskyCategoriesSkeleton() {
  return (
    <>
      <Skeleton className="w-full h-20" />
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-10" />
        ))}
      </div>
    </>
  );
}
