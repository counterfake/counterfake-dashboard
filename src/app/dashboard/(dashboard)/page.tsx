"use client";

import React from "react";

import DashboardPageWrapper from "@/features/user-dashboard/components/layout/dashboard-page-wrapper";

import { MonthlyAnalysisStats } from "@/features/analytics/components/monthly-analysis-stats/monthly-analysis-stats";
import { MonthlyRiskyClosedProducts } from "@/features/analytics/components/monthly-risky-closed-products/monthly-risky-closed-products";
import { Top10RiskySellers } from "@/features/analytics/components/top-10-risky-sellers/top-10-risky-sellers";
import { MonthlyRiskyClosedSellers } from "@/features/analytics/components/monthly-risky-closed-sellers/monthly-risky-closed-sellers";
import { TopRiskyCategories } from "@/features/analytics/components/top-risky-categories/top-risky-categories";
import { RiskyPlatforms } from "@/features/analytics/components/risky-platforms/risky-platforms";

import { useDashboardPageMonths } from "./_hooks/use-dashboard-page-months";
import { useDashboardPageData } from "./_hooks/use-dashboard-page-data";

export default function DashboardPage() {
  const mountsLogic = useDashboardPageMonths();
  const dataLogic = useDashboardPageData({
    selectedMonth: mountsLogic.selectedMonth,
  });

  return (
    <DashboardPageWrapper
      title="Dashboard"
      description="Monitor your brand protection metrics and recent activity."
      showGoBack={false}
      breadcrumbs={[
        {
          label: "Dashboard",
        },
      ]}
    >
      <MonthlyAnalysisStats
        stats={dataLogic.monthlyStats.data}
        isLoading={dataLogic.monthlyStats.isLoading}
        isError={dataLogic.monthlyStats.isError}
      />

      <MonthlyRiskyClosedProducts
        monthlyChartData={dataLogic.monthlyChartData}
        riskyProductsTrend={dataLogic.monthlyStats.data?.riskyProductsTrend}
        closedProductsTrend={dataLogic.monthlyStats.data?.closedProductsTrend}
        isLoading={dataLogic.monthlyStats.isLoading}
        isError={dataLogic.monthlyStats.isError}
        monthOptions={mountsLogic.monthOptions}
        selectedMonth={mountsLogic.selectedMonth}
        onMonthChange={mountsLogic.setSelectedMonth}
      />

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <Top10RiskySellers
          topRiskySellers={dataLogic.transformedTopRiskySellers}
          isLoading={dataLogic.sellersTopFakes.isLoading}
          isError={dataLogic.sellersTopFakes.isError}
          className="xl:col-span-2"
        />
        <MonthlyRiskyClosedSellers
          monthOptions={mountsLogic.monthOptions}
          selectedMonth={mountsLogic.selectedMonth}
          onMonthChange={mountsLogic.setSelectedMonth}
          monthlyChartData={dataLogic.monthlyChartData}
          riskySellersTrend={dataLogic.monthlyStats.data?.riskySellersTrend}
          closedSellersTrend={dataLogic.monthlyStats.data?.closedSellersTrend}
          isLoading={dataLogic.monthlyStats.isLoading}
          isError={dataLogic.monthlyStats.isError}
          className="xl:col-span-3"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TopRiskyCategories
            topRiskyCategories={dataLogic.transformedTopRiskyCategories}
            isLoading={dataLogic.riskyProductCategories.isLoading}
            isError={dataLogic.riskyProductCategories.isError}
          />
        </div>
        <div className="xl:col-span-1">
          <RiskyPlatforms
            monthlyChartData={dataLogic.transformedRiskyPlatformsData}
            isLoading={dataLogic.riskyPlatforms.isLoading}
            isError={dataLogic.riskyPlatforms.isError}
          />
        </div>
      </div>
    </DashboardPageWrapper>
  );
}
