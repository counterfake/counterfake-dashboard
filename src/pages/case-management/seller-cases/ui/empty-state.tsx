import React from "react";
import { Card, CardContent } from "@/common/components/ui/primitives/card";
import { FileX, Search } from "lucide-react";

interface EmptyStateProps {
  hasFilters?: boolean;
}

export function CasesEmptyState({ hasFilters = false }: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          {hasFilters ? (
            <Search className="h-8 w-8 text-muted-foreground" />
          ) : (
            <FileX className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        
        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-semibold">
            {hasFilters ? "No cases found" : "No seller cases yet"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            {hasFilters 
              ? "Try adjusting your filters or search terms to find what you're looking for."
              : "When seller cases are reported and processed, they'll appear here for tracking and management."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
