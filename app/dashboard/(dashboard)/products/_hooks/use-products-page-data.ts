import { useMemo } from "react";

import { ROUTES } from "@/common/lib/config/routes";

import {
  // Services
  productReportStatusService,
  productStatusService,

  // Hooks
  useGetCustomerProductAnalysis,
  useGetCustomerProductCategories,
  useGetCustomerProductResults,
  useGetProductReasons,
} from "@/features/products";
import { ProductQueries } from "./use-products-page-query";
import { useAuthStore } from "@/common/lib/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import { productQueries } from "@/entities/brand-protection/product";

interface UseProductsPageDataProps {
  queries: ProductQueries;
}

export function useProductsPageData({ queries }: UseProductsPageDataProps) {
  const { user } = useAuthStore();

  const brands = user.brand.ownedBrands.join(",");

  // --------------------------
  // Fetch data
  // --------------------------

  const { data: closedCount } = useQuery(
    productQueries.closedCount({ brandId: brands })
  );
  const { data: riskyCount } = useQuery(
    productQueries.riskyCount({ brandId: brands })
  );

  // Fetch product data
  const productsResponse = useGetCustomerProductResults({
    page: Number(queries.page),
    limit: Number(queries.limit),
    url: queries.searchByURL,
    search: queries.searchByName,
    statusId: Number(queries.status) as any,
    platformId: queries.platform === "all" ? "" : queries.platform,
    reportStatusIds: queries.reportStatus,
    category: queries.category,
    reasons: queries.reason,
  });

  // Fetch product analysis data
  const productAnalysisResponse = useGetCustomerProductAnalysis({
    productName: queries.searchByName,
    productUrl: queries.searchByURL,
    statusId: Number(queries.status) as any,
    reportStatusIds: queries.reportStatus.split(",").map(Number) as any,
    categoryId: queries.category,
    reasons: queries.reason,
  });

  const productReasonsResponse = useGetProductReasons({
    limit: 100,
  });

  const parentClassesResponse = useGetCustomerProductCategories({
    doAnalysis: true,
  });

  // --------------------------
  // Data Transforms
  // --------------------------
  const products = useMemo(() => {
    const productData = productsResponse?.data?.products || [];

    return productData.map((product) => ({
      ...product,
      visitButtonHref: product?.ad?.url,
      detailsButtonHref: `${ROUTES.USER_DASHBOARD}/products/${product?.id}`,
      titleHref: `${ROUTES.USER_DASHBOARD}/products/${product?.id}`,
    }));
  }, [productsResponse]);
  const platformAnalysis = useMemo(
    () => productAnalysisResponse?.data?.platforms || [],
    [productAnalysisResponse]
  );
  const totalPages = useMemo(
    () => productsResponse?.data?.totalPages || 1,
    [productsResponse]
  );
  const productReasons = useMemo(
    () => productReasonsResponse?.data?.results || [],
    [productReasonsResponse]
  );
  const productCategories = useMemo(
    () => parentClassesResponse?.data || [],
    [parentClassesResponse]
  );

  // --------------------------
  // Filter state options
  // --------------------------
  const platformOptions = useMemo(() => {
    const allOption = {
      value: "all",
      label: "All",
    };

    const platformOptions = platformAnalysis.map((platform) => ({
      value: String(platform.id),
      label: `${platform.name} (${platform.value})`,
    }));

    return [allOption, ...platformOptions];
  }, [platformAnalysis]);

  const categoryOptions = useMemo(
    () =>
      productCategories.map((category) => ({
        value: String(category.id),
        label: category.name,
      })),
    [productCategories]
  );

  const reasonOptions = useMemo(
    () =>
      productReasons.map((reason) => ({
        value: String(reason.index),
        label: reason.name,
      })),
    [productReasons]
  );

  const statusOptions = useMemo(
    () =>
      productStatusService.getAll().map((status) => ({
        value: String(status.id),
        label: status.label,
      })),
    []
  );

  const reportStatusOptions = useMemo(
    () =>
      productReportStatusService
        .filterByKeys(["REPORTED", "REOPENED", "NOTIFIED", "READY"])
        .map((status) => ({
          value: String(status.id),
          label: status.label,
        })),
    []
  );

  // --------------------------
  // All of filter state options
  // --------------------------
  const filterOptions = useMemo(() => {
    return {
      categories: categoryOptions,
      statuses: statusOptions,
      platforms: platformOptions,
      reasons: reasonOptions,
      reportStatuses: reportStatusOptions,
    };
  }, [
    categoryOptions,
    reportStatusOptions,
    platformOptions,
    reasonOptions,
    statusOptions,
  ]);

  // --------------------------
  // Actions
  // --------------------------
  /**
   * Formats the raw filter data into a structured format
   * Converts comma-separated report status string into an array of values
   * and maps other filter properties directly
   */
  const formatQueries = (filterData: ProductQueries) => {
    const reportStatus = reportStatusOptions
      .filter((reportStatus) =>
        filterData.reportStatus.split(",").includes(reportStatus.value)
      )
      .map((reportStatus) => reportStatus.value);

    return {
      searchByName: filterData?.searchByName,
      searchByURL: filterData?.searchByURL,
      category: filterData?.category,
      platform: filterData?.platform,
      status: filterData?.status,
      reason: filterData?.reason,
      reportStatus: reportStatus,
      page: filterData?.page,
      limit: filterData?.limit,
    };
  };

  const formatQueriesForQuery = (
    filterState: Partial<ReturnType<typeof formatQueries>>
  ): ProductQueries => {
    return {
      searchByName: filterState.searchByName || "",
      searchByURL: filterState.searchByURL || "",
      status: filterState.status || "",
      platform: filterState.platform || "",
      category: filterState.category || "",
      reason: filterState.reason || "",
      reportStatus: filterState.reportStatus.join(","),
      page: filterState.page || "",
      limit: filterState.limit || "",
    };
  };

  const getAppliedFilters = (
    filterData: Omit<ProductQueries, "currentPage" | "limit">
  ): { label: string; value: string }[] => {
    let appliedFilters: { label: string; value: string }[] = [];

    // Find valid filters
    const category = categoryOptions.find(
      (category) => String(category.value) === filterData.category
    );
    const platform = platformOptions.find(
      (platform) => String(platform.value) === filterData.platform
    );
    const status = statusOptions.find(
      (status) => String(status.value) === filterData.status
    );
    const reason = reasonOptions.find(
      (reason) => String(reason.value) === filterData.reason
    );
    const reportStatus = reportStatusOptions
      .filter((reportStatus) =>
        filterData.reportStatus?.includes(reportStatus.value)
      )
      .map((reportStatus) => reportStatus.label);

    // Add valid filters to applied filters
    // Search filters
    if (filterData.searchByName)
      appliedFilters.push({
        label: "Search by name",
        value: filterData.searchByName,
      });
    if (filterData.searchByURL)
      appliedFilters.push({
        label: "Search by URL",
        value: filterData.searchByURL,
      });
    // Category filter
    if (category)
      appliedFilters.push({ label: "Category", value: category.label });
    // Platform filter
    if (platform)
      appliedFilters.push({ label: "Platform", value: platform.label });
    // Status filter
    if (status) appliedFilters.push({ label: "Status", value: status.label });
    // Reason filter
    if (reason) appliedFilters.push({ label: "Reason", value: reason.label });
    // Report Status filter
    if (reportStatus)
      appliedFilters.push({
        label: "Report Status",
        value: reportStatus.join(", "),
      });

    return appliedFilters;
  };

  return {
    // Data
    products,
    totalPages,
    filterOptions,

    // Stats
    closedCount,
    riskyCount,

    // Responses
    productsResponse,

    // Actions
    formatQueries,
    formatQueriesForQuery,
    getAppliedFilters,
  };
}
