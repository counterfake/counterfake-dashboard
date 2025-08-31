"use client";

import React from "react";

import { useDashboardPageData } from "@/features/user-dashboard/hooks/use-dashboard-page-data";
import { useDashboardPageMonths } from "@/features/user-dashboard/hooks/use-dashboard-page-months";

import DashboardPageWrapper from "@/features/user-dashboard/components/dashboard-page-wrapper";

import { MonthlyAnalysisStats } from "@/features/analytics/components/monthly-analysis-stats/monthly-analysis-stats";
import { MonthlyRiskyClosedProducts } from "@/features/analytics/components/monthly-risky-closed-products/monthly-risky-closed-products";
import { Top10RiskySellers } from "@/features/analytics/components/top-10-risky-sellers/top-10-risky-sellers";
import { MonthlyRiskyClosedSellers } from "@/features/analytics/components/monthly-risky-closed-sellers/monthly-risky-closed-sellers";
import { TopRiskyCategories } from "@/features/analytics/components/top-risky-categories/top-risky-categories";
import { RiskyPlatforms } from "@/features/analytics/components/risky-platforms/risky-platforms";

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
        monthlyChartData={dataLogic.productsMonthlyChartData}
        riskyProductsTrend={dataLogic.monthlyStats.data.riskyProductsTrend}
        closedProductsTrend={dataLogic.monthlyStats.data.closedProductsTrend}
        isLoading={dataLogic.monthlyStats.isLoading}
        isError={dataLogic.monthlyStats.isError}
        monthOptions={mountsLogic.monthOptions}
        selectedMonth={mountsLogic.selectedMonth}
        onMonthChange={mountsLogic.setSelectedMonth}
      />

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <Top10RiskySellers
          topRiskySellers={dataLogic.sellersTopFakes.data.map((seller) => ({
            name: seller.universal_name,
            id: seller.id.toString(),
            riskyProducts: seller.fake_product_count,
            totalProducts: seller.product_count,
            isClosed: seller.is_closed,
          }))}
          isLoading={dataLogic.sellersTopFakes.isLoading}
          isError={dataLogic.sellersTopFakes.isError}
          className="xl:col-span-2"
        />
        <MonthlyRiskyClosedSellers
          monthOptions={mountsLogic.monthOptions}
          selectedMonth={mountsLogic.selectedMonth}
          onMonthChange={mountsLogic.setSelectedMonth}
          monthlyChartData={dataLogic.sellersMonthlyChartData}
          riskySellersTrend={dataLogic.monthlyStats.data.riskySellersTrend}
          closedSellersTrend={dataLogic.monthlyStats.data.closedSellersTrend}
          isLoading={dataLogic.monthlyStats.isLoading}
          isError={dataLogic.monthlyStats.isError}
          className="xl:col-span-3"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TopRiskyCategories
            topRiskyCategories={dataLogic.riskyProductCategories.data.map(
              (category) => ({
                name: category.name,
                riskyProducts: category.details_for_risky.risky_count,
                totalProducts: category.details_for_risky.total_count,
                id: category.index,
              })
            )}
            isLoading={dataLogic.riskyProductCategories.isLoading}
            isError={dataLogic.riskyProductCategories.isError}
          />
        </div>
        <div className="xl:col-span-1">
          <RiskyPlatforms
            monthlyChartData={dataLogic.riskyPlatformChartData}
            isLoading={dataLogic.riskyPlatforms.isLoading}
            isError={dataLogic.riskyPlatforms.isError}
          />
        </div>
      </div>
    </DashboardPageWrapper>
  );
}
