"use client";

import React from "react";
import { CircleAlert } from "lucide-react";

interface ReportReasonsProps {
  reportReasons: string[];
}

export function ReportReasons({ reportReasons }: ReportReasonsProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold flex items-center gap-2">
        Report Reasons
      </h4>
      <div className="space-y-2">
        {reportReasons.length > 0 ? (
          reportReasons.map((reason, index) => (
            <div
              key={index}
              className="w-fit flex items-center gap-2 font-medium text-sm border-muted-foreground/10 bg-muted-foreground/10 rounded-full px-4 py-1"
            >
              <CircleAlert className="w-4 h-4" />
              {reason}
            </div>
          ))
        ) : (
          <div className="w-fit flex items-center gap-2 font-medium text-sm">
            <CircleAlert className="w-4 h-4" />
            No report reasons available.
          </div>
        )}
      </div>
    </div>
  );
}
