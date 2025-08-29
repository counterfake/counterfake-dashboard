export interface MonthlyAnalysisStatsProps {
  stats: {
    latestMonthRiskyProducts: number;
    latestMonthClosedProducts: number;
    latestMonthRiskySellers: number;
    latestMonthClosedSellers: number;
    riskyProductTrend: number;
    closedProductTrend: number;
    riskySellerTrend: number;
    closedSellerTrend: number;
  };
  isLoading?: boolean;
  className?: string;
}
