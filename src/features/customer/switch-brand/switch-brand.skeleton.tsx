import React from "react";

import { Skeleton } from "@/shared/ui/primitives/skeleton";

export function SwitchBrandSkeleton() {
  return (
    <div>
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-14 w-full" />
    </div>
  );
}
