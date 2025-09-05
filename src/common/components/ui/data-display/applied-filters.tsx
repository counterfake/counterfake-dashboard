"use client";

import { X } from "lucide-react";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../primitives/tooltip";

interface AppliedFilter {
  label: string;
  value: string | null;
}

interface AppliedFiltersProps {
  filters: AppliedFilter[];
  allowClear?: boolean;
  onClear: () => void;
  clearButtonLabel?: string;
}

export default function AppliedFilters({
  filters,
  allowClear = true,
  onClear,
  clearButtonLabel = "Clear",
}: AppliedFiltersProps) {
  // Don't render if no filters applied
  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 flex flex-wrap items-center gap-3">
      <h3 className="text-sm font-medium text-foreground flex items-center gap-2 m-0">
        <div className="w-2 h-2 bg-primary rounded-full" />
        Applied Filters ({filters.length})
      </h3>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          if (!filter || !filter.value || !filter.label) return null;

          return (
            <div
              key={`${filter.label}-${filter.value}`}
              className="text-xs bg-muted border-border text-foreground rounded-full hover:bg-accent-foreground/10 px-3 py-1 font-medium max-w-xs"
            >
              <span className="text-accent-foreground font-medium">
                {filter.label}:
              </span>{" "}
              <span className="truncate font-normal">{filter.value}</span>
            </div>
          );
        })}
        {allowClear && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onClear}
                className="flex items-center justify-center cursor-pointer bg-muted border-border text-foreground rounded-full hover:bg-muted-foreground/10 px-2 py-1 text-xs"
              >
                <X className="w-3 h-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent sideOffset={5}>{clearButtonLabel}</TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
