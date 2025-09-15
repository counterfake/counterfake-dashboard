import React from "react";
import SimpleErrorCard from "@/common/components/ui/data-display/cards/simple-error-card";

export default function MonthlyRiskyClosedProductsError() {
  return (
    <SimpleErrorCard
      title="Products Stats Not Loaded"
      description="Products stats could not be loaded. Please try again later."
      layout="vertical"
      className="h-[400px]"
    />
  );
}
