import React from "react";
import { BarChart3 } from "lucide-react";

import { StatsCard } from "@/components/ui/data-display/cards/stats-card";

export interface ProductAnalysisProps {
  totalProduct: number;
}

export default function ProductAnalysis({
  totalProduct,
}: ProductAnalysisProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard
        title="Total Products"
        value={totalProduct}
        icon={BarChart3}
        color="primary"
        description="Total number of products"
      />
    </div>
  );
}
