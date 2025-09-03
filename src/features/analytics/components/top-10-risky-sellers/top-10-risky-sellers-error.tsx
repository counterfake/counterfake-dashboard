import SimpleErrorCard from "@/common/components/ui/data-display/cards/simple-error-card";
import React from "react";

export default function Top10RiskySellersError() {
  return (
    <SimpleErrorCard
      title="Top 10 Risky Sellers Not Loaded"
      description="Top 10 Risky Sellers could not be loaded. Please try again later."
      layout="vertical"
      className="h-[500px]"
    />
  );
}
