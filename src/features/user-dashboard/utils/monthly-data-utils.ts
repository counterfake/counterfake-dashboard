import { type GetResultsAnalysisMonthlyResponse } from "@/common/types/brand-protection/results";

export interface MonthlyAnalysisStats {
  // Totals
  totalRiskyProducts: number;
  totalClosedProducts: number;
  totalRiskySellers: number;
  totalClosedSellers: number;
  // Latest Month
  latestMonthRiskyProducts: number;
  latestMonthClosedProducts: number;
  latestMonthRiskySellers: number;
  latestMonthClosedSellers: number;
  // Trends
  riskyProductsTrend: number;
  closedProductsTrend: number;
  riskySellersTrend: number;
  closedSellersTrend: number;
}

export function calculateMonthlyStats(
  data: GetResultsAnalysisMonthlyResponse
): MonthlyAnalysisStats {
  if (!data || data.length === 0) {
    return {
      totalRiskyProducts: 0,
      totalClosedProducts: 0,
      totalRiskySellers: 0,
      totalClosedSellers: 0,

      latestMonthRiskyProducts: 0,
      latestMonthClosedProducts: 0,
      latestMonthRiskySellers: 0,
      latestMonthClosedSellers: 0,

      riskyProductsTrend: 0,
      closedProductsTrend: 0,
      riskySellersTrend: 0,
      closedSellersTrend: 0,
    };
  }

  // --------------------------
  // Calculate total data
  // --------------------------
  const totalRiskyProducts = data.reduce(
    (sum, item) => sum + item.risky_product_count,
    0
  );
  const totalClosedProducts = data.reduce(
    (sum, item) => sum + item.closed_product_count,
    0
  );
  const totalRiskySellers = data.reduce(
    (sum, item) => sum + item.risky_seller_count,
    0
  );
  const totalClosedSellers = data.reduce(
    (sum, item) => sum + item.closed_seller_count,
    0
  );

  // --------------------------
  // Calculate latest month data
  // --------------------------
  const latestMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];

  const latestMonthRiskyProducts = latestMonth?.risky_product_count || 0;
  const latestMonthClosedProducts = latestMonth?.closed_product_count || 0;
  const latestMonthRiskySellers = latestMonth?.risky_seller_count || 0;
  const latestMonthClosedSellers = latestMonth?.closed_seller_count || 0;

  // --------------------------
  // Calculate trends data
  // --------------------------
  const riskyProductsTrend =
    previousMonth && latestMonth
      ? latestMonth.risky_product_count - previousMonth.risky_product_count
      : 0;

  const closedProductsTrend =
    previousMonth && latestMonth
      ? latestMonth.closed_product_count - previousMonth.closed_product_count
      : 0;

  const riskySellersTrend =
    previousMonth && latestMonth
      ? latestMonth.risky_seller_count - previousMonth.risky_seller_count
      : 0;

  const closedSellersTrend =
    previousMonth && latestMonth
      ? latestMonth.closed_seller_count - previousMonth.closed_seller_count
      : 0;

  return {
    // Totals
    totalRiskyProducts,
    totalClosedProducts,
    totalRiskySellers,
    totalClosedSellers,
    // Latest Month
    latestMonthRiskyProducts,
    latestMonthClosedProducts,
    latestMonthRiskySellers,
    latestMonthClosedSellers,
    // Trends
    riskyProductsTrend,
    closedProductsTrend,
    riskySellersTrend,
    closedSellersTrend,
  };
}
