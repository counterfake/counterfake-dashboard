import React from "react";
import { Card, CardContent, CardHeader } from "@/common/components/ui/primitives/card";

export function CasesLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-5 bg-muted rounded w-48"></div>
                <div className="h-4 bg-muted rounded w-32"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 bg-muted rounded w-16"></div>
                <div className="h-6 bg-muted rounded w-20"></div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-32"></div>
                <div className="h-4 bg-muted rounded w-28"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="h-4 bg-muted rounded w-20"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-5 bg-muted rounded w-16"></div>
              <div className="h-5 bg-muted rounded w-20"></div>
              <div className="h-5 bg-muted rounded w-18"></div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-muted">
              <div className="flex gap-4">
                <div className="h-3 bg-muted rounded w-24"></div>
                <div className="h-3 bg-muted rounded w-28"></div>
              </div>
              <div className="h-8 bg-muted rounded w-24"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
