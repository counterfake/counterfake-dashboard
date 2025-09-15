import { useMemo } from "react";

import {
  // Services
  productAnalysisService,
  productReportStatusService,
  productStatusService,

  // Hooks
  useGetCustomerProductAnalysis,
  useGetCustomerProductAnalysisMonthly,
  useGetCustomerProductCategories,
} from "@/features/products";
import { useGetCustomerSellersTopFakes } from "@/features/seller-profile";

interface UseDashboardPageDataProps {
  selectedMonth: number;
}

export function useDashboardPageData({
  selectedMonth = 12,
}: UseDashboardPageDataProps) {
  const riskyCategory = productStatusService.getByKey("risky");

  // --------------------------
  // Fetch data
  // --------------------------
  const riskyAnalysisResponse = useGetCustomerProductAnalysis({
    statusId: riskyCategory.id,
    sellerShouldHaveProducts: 5,
    reportStatusIds: productReportStatusService
      .filterByKeys(["REPORTED", "REOPENED", "NOTIFIED", "READY"])
      .map((status) => status.id),
  });

  const productAnalysisMonthlyResponse = useGetCustomerProductAnalysisMonthly({
    sortByMonth: true,
    order: "desc",
    limit: 12,
  });

  const sellersTopFakesResponse = useGetCustomerSellersTopFakes();

  const productCategoriesResponse = useGetCustomerProductCategories({
    doAnalysis: true,
    sortByRiskyCount: true,
  });

  // --------------------------
  // Group data
  // --------------------------
  const monthlyStats = useMemo(
    () => ({
      isLoading: productAnalysisMonthlyResponse.isLoading,
      isError: productAnalysisMonthlyResponse.isError,
      data: productAnalysisService.calculateMonthlyStats(
        productAnalysisMonthlyResponse.data?.slice(-selectedMonth)
      ),
    }),
    [productAnalysisMonthlyResponse, selectedMonth]
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
      isLoading: productCategoriesResponse.isLoading,
      isError: productCategoriesResponse.isError,
      data: productCategoriesResponse.data,
    }),
    [productCategoriesResponse]
  );

  const riskyPlatforms = useMemo(
    () => ({
      isLoading: riskyAnalysisResponse.isLoading,
      isError: riskyAnalysisResponse.isError,
      data: riskyAnalysisResponse.data?.platforms,
    }),
    [riskyAnalysisResponse]
  );

  // --------------------------
  // Transform data for components
  // --------------------------
  const monthlyChartData = useMemo(
    () =>
      productAnalysisMonthlyResponse.data?.map((item) => ({
        month: item.month,
        riskyProducts: item.risky_product_count,
        closedProducts: item.closed_product_count,
        riskySellers: item.risky_seller_count,
        closedSellers: item.closed_seller_count,
      })) || [],
    [productAnalysisMonthlyResponse.data]
  );

  const transformedTopRiskySellers = useMemo(
    () =>
      sellersTopFakes.data?.map((seller) => ({
        name: seller.universal_name,
        id: seller.id.toString(),
        riskyProducts: seller.fake_product_count,
        totalProducts: seller.product_count,
        isClosed: seller.is_closed,
      })) || [],
    [sellersTopFakes.data]
  );

  const transformedTopRiskyCategories = useMemo(
    () =>
      riskyProductCategories.data?.map((category) => ({
        name: category?.name,
        riskyProducts: category?.riskyProducts,
        totalProducts: category?.totalProducts,
        id: category?.id,
      })) || [],
    [riskyProductCategories.data]
  );

  const transformedRiskyPlatformsData = useMemo(
    () =>
      riskyPlatforms.data?.map((item) => ({
        platform: item.name,
        product: item.value,
      })) || [],
    [riskyPlatforms.data]
  );

  return {
    // Raw data
    monthlyStats,
    sellersTopFakes,
    riskyProductCategories,
    riskyPlatforms,

    // Transformed data for components
    monthlyChartData,
    transformedTopRiskySellers,
    transformedTopRiskyCategories,
    transformedRiskyPlatformsData,
  };
}
