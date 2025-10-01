import React from "react";

import { Card, CardContent } from "@/common/components/ui/primitives/card";
import { Skeleton } from "@/shared/ui/primitives/skeleton";

export function SellerProfileSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-12" />
          <div className="flex-1 min-w-0">
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
