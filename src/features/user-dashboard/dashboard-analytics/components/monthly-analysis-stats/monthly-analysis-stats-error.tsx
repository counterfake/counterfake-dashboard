import React from "react";

import SimpleErrorCard from "@/components/ui/data-display/cards/simple-error-card";

export default function MonthlyAnalysisStatsError() {
  return (
    <SimpleErrorCard
      title="Stats failed to load."
      description="Failed to load monthly stats. If the problem persists, contact support."
      layout="horizontal"
      align="center"
    />
  );
}
