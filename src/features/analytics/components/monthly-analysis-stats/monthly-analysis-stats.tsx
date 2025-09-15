import React from "react";
import { Shield, ShieldX, Users, UserX } from "lucide-react";

import { StatsCard } from "@/common/components/ui/data-display/cards/stats-card";

import MonthlyAnalysisStatsSkeleton from "./monthly-analysis-stats-skeleton";
import MonthlyAnalysisStatsError from "./monthly-analysis-stats-error";

interface MonthlyAnalysisStatsProps {
  stats: {
    latestMonthRiskyProducts: number;
    latestMonthClosedProducts: number;
    latestMonthRiskySellers: number;
    latestMonthClosedSellers: number;
    riskyProductsTrend: number;
    closedProductsTrend: number;
    riskySellersTrend: number;
    closedSellersTrend: number;
  };
  isLoading?: boolean;
  isError?: boolean;
}

export function MonthlyAnalysisStats({
  stats,
  isLoading,
  isError,
}: MonthlyAnalysisStatsProps) {
  if (isLoading) {
    return <MonthlyAnalysisStatsSkeleton />;
  }

  if (isError) {
    return <MonthlyAnalysisStatsError />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatsCard
        title="Risky Products"
        value={stats.latestMonthRiskyProducts.toLocaleString()}
        icon={ShieldX}
        trend={{
          value: String(stats.riskyProductsTrend),
          isPositive: stats.riskyProductsTrend > 0,
        }}
      />

      <StatsCard
        title="Closed Products"
        value={stats.latestMonthClosedProducts.toLocaleString()}
        icon={Shield}
        trend={{
          value: String(stats.closedProductsTrend),
          isPositive: stats.closedProductsTrend > 0,
        }}
      />

      <StatsCard
        title="Risky Sellers"
        value={stats.latestMonthRiskySellers.toLocaleString()}
        icon={UserX}
        trend={{
          value: String(stats.riskySellersTrend),
          isPositive: stats.riskySellersTrend > 0,
        }}
      />

      <StatsCard
        title="Closed Sellers"
        value={stats.latestMonthClosedSellers.toLocaleString()}
        icon={Users}
        trend={{
          value: String(stats.closedSellersTrend),
          isPositive: stats.closedSellersTrend > 0,
        }}
      />
    </div>
  );
}
