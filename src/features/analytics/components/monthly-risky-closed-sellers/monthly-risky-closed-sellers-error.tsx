import React from "react";
import SimpleErrorCard from "@/common/components/ui/data-display/cards/simple-error-card";

export default function MonthlyRiskyClosedSellersError() {
  return (
    <SimpleErrorCard
      title="Sellers Stats Not Loaded"
      description="Sellers stats could not be loaded. Please try again later."
      layout="vertical"
      className="h-[550px]"
    />
  );
}
