"use client";

import React from "react";
import { Badge } from "@/components/ui/primitives/badge";

interface AppliedFilter {
  key: string;
  label: string;
  value: string;
  displayValue: string;
}

interface AppliedFiltersProps {
  appliedFilters: AppliedFilter[];
}

export default function AppliedFilters({
  appliedFilters,
}: AppliedFiltersProps) {
  // Don't render if no filters applied
  if (appliedFilters.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 flex flex-wrap items-center gap-3">
      <h3 className="text-sm font-medium text-foreground flex items-center gap-2 m-0">
        <div className="w-2 h-2 bg-primary rounded-full" />
        Applied Filters ({appliedFilters.length})
      </h3>

      <div className="flex flex-wrap gap-2">
        {appliedFilters.map((filter) => (
          <div
            key={`${filter.key}-${filter.value}`}
            className="text-xs bg-muted border-border text-foreground rounded-full hover:bg-accent-foreground/10 px-3 py-1 font-medium max-w-xs"
          >
            <span className="text-accent-foreground font-medium">
              {filter.label}:
            </span>{" "}
            <span className="truncate font-normal">{filter.displayValue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
