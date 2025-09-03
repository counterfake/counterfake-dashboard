import React from "react";

import SimpleErrorCard from "@/common/components/ui/data-display/cards/simple-error-card";

export default function TopRiskyCategoriesError() {
  return (
    <SimpleErrorCard
      title="Risky Categories cannot be loaded"
      description="Something went wrong"
      className="h-[500px]"
      layout="vertical"
    />
  );
}
