import { useMemo } from "react";

import { bpApiClient } from "@/lib/api/clients/brand-protection";

import { useAuthStore } from "@/lib/stores/auth-store";

// --------------------------
// Hooks
// --------------------------
import { useCategoryByKey } from "@/hooks/brand-protection/use-categories";
import {
  useResultAnalysisMonthly,
  useResultsAnalysis,
} from "@/hooks/brand-protection/use-results";
import { useSellersTopFakes } from "@/hooks/brand-protection/use-sellers";
import { useParentClasses } from "@/hooks/brand-protection/use-classifications";

// --------------------------
// Utils
// --------------------------
import { calculateMonthlyStats } from "../utils/monthly-data-utils";
import {
  formatPlatformsChartData,
  formatProductsMonthlyChartData,
  formatSellersMonthlyChartData,
} from "../utils/chart-data-utils";
import { sortByRiskyCount } from "../utils/product-category-utils";

const reportStatusService = bpApiClient.productReportStatusService;

interface UseAnalyticsDataProps {
  selectedMonth: number;
}

export function useAnalyticsData({
  selectedMonth = 12,
}: UseAnalyticsDataProps) {
  const { user } = useAuthStore();

  const riskyCategory = useCategoryByKey("risky");

  // --------------------------
  // Fetch data
  // --------------------------
  const riskyAnalysisResponse = useResultsAnalysis({
    brand: user?.brand?.id || undefined,
    category: String(riskyCategory?.id),
    product_count: "5",
    report: reportStatusService
      .filterByKeys(["REPORTED", "REOPENED", "NOTIFIED", "READY"])
      .map((status) => status.id)
      .join(","),
  });

  const resultAnalysisMonthlyResponse = useResultAnalysisMonthly({
    brand: user?.brand?.id || undefined,
    sortByMonth: true,
    order: "desc",
    limit: 12,
  });

  const sellersTopFakesResponse = useSellersTopFakes({
    brand: user?.brand?.id || undefined,
  });

  const parentClassesResponse = useParentClasses({
    brand: user?.brand?.id || undefined,
    do_analysis: true,
  });

  // --------------------------
  // Extract data from responses
  // --------------------------
  const resultAnalysisMonthly = useMemo(
    () => resultAnalysisMonthlyResponse?.data || [],
    [resultAnalysisMonthlyResponse]
  );
  const parentClasses = useMemo(
    () => parentClassesResponse?.data?.parent_classes || [],
    [parentClassesResponse]
  );
  const riskyPlatformAnalysis = useMemo(
    () => riskyAnalysisResponse?.data?.platform_analysis || [],
    [riskyAnalysisResponse]
  );

  // --------------------------
  // Format data if needed
  // --------------------------
  const calculatedMonthlyStats = useMemo(
    () => calculateMonthlyStats(resultAnalysisMonthly.slice(-selectedMonth)),
    [resultAnalysisMonthly, selectedMonth]
  );

  const sellersMonthlyChartData = useMemo(
    () =>
      formatSellersMonthlyChartData(
        resultAnalysisMonthly.slice(-selectedMonth)
      ),
    [resultAnalysisMonthly, selectedMonth]
  );

  parentClasses.sort(sortByRiskyCount);

  // Chart data
  const productsMonthlyChartData = useMemo(
    () =>
      formatProductsMonthlyChartData(
        resultAnalysisMonthly.slice(-selectedMonth)
      ),
    [resultAnalysisMonthly, selectedMonth]
  );

  const riskyPlatformChartData = useMemo(
    () =>
      formatPlatformsChartData(
        riskyPlatformAnalysis.map((item) => ({
          name: item.name,
          value: item.value,
        }))
      ),
    [riskyPlatformAnalysis]
  );

  // --------------------------
  // Group data
  // --------------------------
  const monthlyStats = useMemo(
    () => ({
      isLoading: resultAnalysisMonthlyResponse.isLoading,
      isError: resultAnalysisMonthlyResponse.isError,
      data: calculatedMonthlyStats,
    }),
    [resultAnalysisMonthlyResponse, calculatedMonthlyStats]
  );

  const sellersTopFakes = useMemo(
    () => ({
      isLoading: sellersTopFakesResponse.isLoading,
      isError: sellersTopFakesResponse.isError,
      data: sellersTopFakesResponse.data || [],
    }),
    [sellersTopFakesResponse]
  );

  const riskyProductCategories = useMemo(
    () => ({
      isLoading: parentClassesResponse.isLoading,
      isError: parentClassesResponse.isError,
      data: parentClasses,
    }),
    [parentClassesResponse, parentClasses]
  );

  const riskyPlatforms = useMemo(
    () => ({
      isLoading: riskyAnalysisResponse.isLoading,
      isError: riskyAnalysisResponse.isError,
      data: riskyPlatformAnalysis,
    }),
    [riskyAnalysisResponse, riskyPlatformAnalysis]
  );

  return {
    // Data
    monthlyStats,
    productsMonthlyChartData,
    sellersMonthlyChartData,
    sellersTopFakes,
    riskyProductCategories,
    riskyPlatforms,
    riskyPlatformChartData,
  };
}
