import { useMemo, useState } from "react";

import { useSearchParams } from "@/common/hooks/use-search-params";

import { productReportStatusService } from "@/features/brand-protection/products/services/product-report-status.service";
import { productStatusService } from "@/features/brand-protection/products/services/product-status.service";

export interface ProductFilters {
  searchByName: string;
  searchByURL: string;
  status: string;
  platform: string;
  category: string;
  reason: string;
  reportStatus: string;
}

export function useProductsPageFilters() {
  const searchParams = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);

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

  const filters: ProductFilters = useMemo(
    () => ({
      searchByName: searchParams.get("searchByName") || "",
      searchByURL: searchParams.get("searchByURL") || "",
      status: searchParams.get("status") || String(defaultStatus),
      platform: searchParams.get("platform") || "",
      category: searchParams.get("category") || "",
      reason: searchParams.get("reason") || "",
      reportStatus: searchParams.get("reportStatus") || defaultReportStatuses,
    }),
    [defaultReportStatuses, defaultStatus, searchParams]
  );

  // --------------------------
  // Actions
  // --------------------------
  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    searchParams.setMultiple(newFilters as any);
  };

  const clearFilters = () => {
    searchParams.setMultiple({
      searchByName: "",
      searchByURL: "",
      status: "",
      platform: "",
      category: "",
      reason: "",
      reportStatus: "",
    });
  };

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  return {
    // Data
    filters,
    filterOpen,

    // Actions
    updateFilters,
    clearFilters,
    setFilterOpen,
    handleFilterOpen,
  };
}
