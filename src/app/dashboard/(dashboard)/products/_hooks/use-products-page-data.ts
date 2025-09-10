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

import { type ProductFilters } from "./use-products-page-filters";

interface UseProductsPageDataProps {
  filters: ProductFilters;
  currentPage: number;
  limit: number;
}

export function useProductsPageData({
  filters,
  currentPage,
  limit,
}: UseProductsPageDataProps) {
  // --------------------------
  // Fetch data
  // --------------------------

  // Fetch product data
  const productsResponse = useGetCustomerProductResults({
    page: currentPage,
    limit: limit,
    url: filters.searchByURL,
    search: filters.searchByName,
    statusId: Number(filters.status) as any,
    platformId: filters.platform,
    reportStatusIds: filters.reportStatus,
    category: filters.category,
    reasons: filters.reason,
  });

  // Fetch product analysis data
  const productAnalysisResponse = useGetCustomerProductAnalysis({
    productName: filters.searchByName,
    productUrl: filters.searchByURL,
    statusId: Number(filters.status) as any,
    platformId: filters.platform,
    reportStatusIds: filters.reportStatus,
    categoryId: filters.category,
    sellerShouldHaveProducts: 5,
    reasons: filters.reason,
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
      visitButtonHref: product?.url,
      detailsButtonHref: `${ROUTES.USER_DASHBOARD}/products/${product?.id}`,
      titleHref: `${ROUTES.USER_DASHBOARD}/products/${product?.id}`,
    }));
  }, [productsResponse]);
  const productAnalysis = useMemo(
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
  const platformOptions = useMemo(
    () =>
      productAnalysis.map((platform) => ({
        value: String(platform.id),
        label: platform.name,
      })),
    [productAnalysis]
  );

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
  const formatFilters = (filterData: ProductFilters) => {
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
    };
  };

  const formatFilterState = (
    filterState: Partial<ReturnType<typeof formatFilters>>
  ): ProductFilters => {
    return {
      searchByName: filterState.searchByName || "",
      searchByURL: filterState.searchByURL || "",
      status: filterState.status || "",
      platform: filterState.platform || "",
      category: filterState.category || "",
      reason: filterState.reason || "",
      reportStatus: filterState.reportStatus.join(","),
    };
  };

  const getAppliedFilters = (
    filterData: ProductFilters
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
    if (category)
      appliedFilters.push({ label: "Category", value: category.label });
    if (platform)
      appliedFilters.push({ label: "Platform", value: platform.label });
    if (status) appliedFilters.push({ label: "Status", value: status.label });
    if (reason) appliedFilters.push({ label: "Reason", value: reason.label });
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
    productAnalysis,
    totalPages,
    filterOptions,

    // Responses
    productsResponse,
    productAnalysisResponse,

    // Actions
    formatFilters,
    formatFilterState,
    getAppliedFilters,
  };
}
