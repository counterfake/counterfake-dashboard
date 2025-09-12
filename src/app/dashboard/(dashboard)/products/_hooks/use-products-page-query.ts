import { useMemo } from "react";

import { useSearchParams } from "@/common/hooks/use-search-params";
import {
  productReportStatusService,
  productStatusService,
} from "@/features/products";
import { scrollIntoView } from "@/common/lib/utils/scroll-into-view";

export type ProductFilters = {
  category: string;
  reason: string;
  reportStatus: string;
};

export type ProductQueries = ProductFilters & {
  status: string;
  platform: string;
  searchByName: string;
  searchByURL: string;
  currentPage: string;
  limit: string;
};

export function useProductsPageQuery() {
  const searchParams = useSearchParams();

  // -----------------------------
  // Default values
  // -----------------------------
  const defaultReportStatuses = useMemo(
    () =>
      productReportStatusService
        .filterByKeys(["REPORTED", "REOPENED", "NOTIFIED", "READY"])
        .map((status) => status.id)
        .join(","),
    []
  );
  const defaultStatus = useMemo(
    () => productStatusService.getByKey("risky")?.id || "",
    []
  );

  // -----------------------------
  // Extract filter parameters from URL search params
  // -----------------------------

  const queries: ProductQueries = useMemo(
    () => ({
      searchByName: searchParams.get("searchByName") || "",
      searchByURL: searchParams.get("searchByURL") || "",
      status: searchParams.get("status") || String(defaultStatus),
      platform: searchParams.get("platform") || "",
      category: searchParams.get("category") || "",
      reason: searchParams.get("reason") || "",
      reportStatus: searchParams.get("reportStatus") || defaultReportStatuses,
      currentPage: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "12",
    }),
    [defaultReportStatuses, defaultStatus, searchParams]
  );

  // --------------------------
  // Actions
  // --------------------------
  const updateQueries = (newFilters: Partial<ProductQueries>) => {
    searchParams.setMultiple(newFilters as any);
  };

  const resetAllQueries = () => {
    updateQueries({
      status: String(defaultStatus),
      platform: "",
      // Search
      searchByName: "",
      searchByURL: "",
      // Filters
      category: "",
      reason: "",
      reportStatus: defaultReportStatuses,
      // Pagination
      currentPage: "1",
    });
  };

  const handleLimitChange = (newLimit: number) => {
    updateQueries({
      limit: newLimit.toString(),
      currentPage: "1",
    });
  };

  const setCurrentPage = (page: number) => {
    scrollIntoView("products-grid");
    updateQueries({
      currentPage: page.toString(),
    });
  };

  const updateFilters = (newFilters: ProductFilters) => {
    updateQueries({
      category: newFilters.category,
      reason: newFilters.reason,
      reportStatus: newFilters.reportStatus,
      currentPage: "1",
    });
  };

  const updateSearchByName = (searchValue: string) => {
    updateQueries({
      searchByName: searchValue,
      currentPage: "1",
    });
  };

  const updateSearchByURL = (searchValue: string) => {
    updateQueries({
      searchByURL: searchValue,
      currentPage: "1",
    });
  };

  const updateStatus = (newStatus: string) => {
    updateQueries({
      status: newStatus,
      // reset other queries
      platform: "",
      category: "",
      reason: "",
      reportStatus: defaultReportStatuses,
      currentPage: "1",
    });
  };

  const updatePlatform = (newPlatform: string) => {
    updateQueries({
      platform: newPlatform,
      // reset other queries
      category: "",
      reason: "",
      reportStatus: defaultReportStatuses,
      currentPage: "1",
    });
  };

  const clearFilters = () => {
    updateQueries({
      category: "",
      reason: "",
      reportStatus: defaultReportStatuses,
      currentPage: "1",
    });
  };

  return {
    // Data
    queries,

    // Actions
    updateQueries,
    resetAllQueries,
    handleLimitChange,
    setCurrentPage,
    updateFilters,
    updateSearchByName,
    updateSearchByURL,
    updateStatus,
    updatePlatform,
    clearFilters,
  };
}
