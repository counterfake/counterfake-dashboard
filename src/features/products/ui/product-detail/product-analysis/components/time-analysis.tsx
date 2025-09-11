"use client";

import React from "react";
import { Clock4, ClockAlert } from "lucide-react";

interface TimeAnalysisProps {
  daysSinceListed?: number;
  daysSinceReported?: number;
}

export function TimeAnalysis({
  daysSinceListed,
  daysSinceReported,
}: TimeAnalysisProps) {
  if (!daysSinceListed || !daysSinceReported) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold flex items-center gap-2">
        Report Time Analysis
      </h4>
      <div className="font-medium text-base text-muted-foreground space-y-1">
        <p>
          <Clock4 className="h-5 w-5 inline-block mr-2" />
          Listed{" "}
          <span className="text-primary font-semibold">
            {daysSinceListed}
          </span>{" "}
          days ago
        </p>
        <p>
          <ClockAlert className="h-5 w-5 mr-2 inline-block" />
          Reported{" "}
          <span className="text-primary font-semibold">
            {daysSinceReported}
          </span>{" "}
          days ago
        </p>
      </div>
      <p className="text-base text-muted-foreground font-medium">
        This product was reported{" "}
        <span className="font-semibold text-destructive">
          {daysSinceListed - daysSinceReported} days
        </span>{" "}
        after its publication date.
      </p>
    </div>
  );
}
