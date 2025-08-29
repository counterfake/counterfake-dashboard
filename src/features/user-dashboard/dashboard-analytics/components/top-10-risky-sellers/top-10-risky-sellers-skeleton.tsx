import { Skeleton } from "@/components/ui/primitives/skeleton";
import React from "react";

export default function Top10RiskySellersSkeleton() {
  return (
    <div className="w-full flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-[90px] w-full" />
      ))}
    </div>
  );
}
