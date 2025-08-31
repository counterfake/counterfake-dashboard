import { useState } from "react";
import { useSearchParams } from "@/hooks/use-search-params";
import { bpApiClient } from "@/lib/api/clients/brand-protection";

const reportStatusService = bpApiClient.productReportStatusService;

export interface ProductFilters {
  searchByName: string;
  searchByURL: string;
  category: string;
  platform: string;
  productCategory: string;
  reason: string;
  reportStatuses: string;
}

export function useProductsListFilters() {
  const searchParams = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);

  // TODO: Wrap all variables with useMemo

  // -----------------------------
  // Extract filter parameters from URL search params
  // -----------------------------

  const filters: ProductFilters = {
    searchByName: searchParams.get("searchByName") || "",
    searchByURL: searchParams.get("searchByURL") || "",
    category: searchParams.get("category") || "1",
    platform: searchParams.get("platform") || "",
    productCategory: searchParams.get("productCategory") || "",
    reason: searchParams.get("reason") || "",
    reportStatuses:
      searchParams.get("reportStatuses") ||
      reportStatusService
        .filterByKeys(["REPORTED", "REOPENED", "NOTIFIED", "READY"])
        .map((status) => status.id)
        .join(","),
  };

  // -----------------------------
  // Event handlers
  // -----------------------------

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  const handleSearchApply = (
    searchKey: "searchByName" | "searchByURL",
    searchValue: string | null
  ) => {
    searchParams.setMultiple({
      [searchKey]: searchValue,
      page: "1", // Reset to first page when filters change
    });
  };

  const handleSearchClear = (searchKey: "searchByName" | "searchByURL") => {
    searchParams.delete(searchKey);
  };

  const handleApplyFilters = (
    newFilters: Record<keyof ProductFilters, any>
  ) => {
    const updatedFilters: ProductFilters = {
      ...newFilters,
      reportStatuses: Array.isArray(newFilters.reportStatuses)
        ? newFilters.reportStatuses.map((status) => status.value).join(",")
        : "",
    };

    searchParams.setMultiple({
      ...updatedFilters,
      page: "1", // Reset to first page when filters change
    });
  };

  const handleClearFilters = () => {
    // Exclude searchByName and searchByURL from the cleared filters
    const clearedFilters: Omit<ProductFilters, "searchByName" | "searchByURL"> =
      {
        category: "",
        platform: "",
        productCategory: "",
        reason: "",
        reportStatuses: "",
      };

    searchParams.setMultiple(clearedFilters as any);
  };

  // -----------------------------
  // Applied filters display for AppliedFilters component
  // -----------------------------
  const getAppliedFiltersDisplay = (filterOptions: any) => {
    const appliedFilters: Array<{
      key: keyof ProductFilters;
      label: string;
      value: string;
      displayValue: string;
    }> = [];

    // Helper function to get label from options
    const getLabelFromOptions = (
      options: Array<{ value: string; label: string }>,
      value: string
    ) => {
      const option = options.find((opt) => opt.value === value);
      return option?.label || value;
    };

    // Add search filters
    if (filters.searchByName) {
      appliedFilters.push({
        key: "searchByName",
        label: "Product Name",
        value: filters.searchByName,
        displayValue: filters.searchByName,
      });
    }

    if (filters.searchByURL) {
      appliedFilters.push({
        key: "searchByURL",
        label: "URL",
        value: filters.searchByURL,
        displayValue: filters.searchByURL,
      });
    }

    // Add category filter (only if not default and explicitly set in URL)
    if (filters.category) {
      appliedFilters.push({
        key: "category",
        label: "Category",
        value: filters.category,
        displayValue: getLabelFromOptions(
          filterOptions.categories,
          filters.category
        ),
      });
    }

    // Add platform filter
    if (filters.platform) {
      appliedFilters.push({
        key: "platform",
        label: "Platform",
        value: filters.platform,
        displayValue: getLabelFromOptions(
          filterOptions.platforms,
          filters.platform
        ),
      });
    }

    // Add product category filter
    if (filters.productCategory) {
      appliedFilters.push({
        key: "productCategory",
        label: "Product Category",
        value: filters.productCategory,
        displayValue: getLabelFromOptions(
          filterOptions.productCategories,
          filters.productCategory
        ),
      });
    }

    // Add reason filter
    if (filters.reason) {
      appliedFilters.push({
        key: "reason",
        label: "Reason",
        value: filters.reason,
        displayValue: getLabelFromOptions(
          filterOptions.reasons,
          filters.reason
        ),
      });
    }

    // Add report statuses filter (only if explicitly set in URL)
    if (filters.reportStatuses) {
      const statusIds = filters.reportStatuses.split(",").filter(Boolean);
      if (statusIds.length > 0) {
        const statusLabels = statusIds
          .map((id) => getLabelFromOptions(filterOptions.reportStatuses, id))
          .join(", ");

        appliedFilters.push({
          key: "reportStatuses",
          label: "Report Status",
          value: filters.reportStatuses,
          displayValue: statusLabels,
        });
      }
    }

    return appliedFilters;
  };

  // -----------------------------
  // Form-compatible filters for ProductFilters component
  // -----------------------------
  const getInitialFiltersForForm = () => {
    const reportStatusArray = filters.reportStatuses
      ? filters.reportStatuses.split(",").map((status) => ({
          value: status,
          label:
            reportStatusService.getById(Number(status) as any)?.label ||
            "unknown",
        }))
      : [];

    return {
      category: filters.category,
      platform: filters.platform,
      productCategory: filters.productCategory,
      reason: filters.reason,
      reportStatuses: reportStatusArray,
    };
  };

  return {
    filters,
    filterOpen,
    setFilterOpen,
    handleFilterOpen,
    handleSearchApply,
    handleSearchClear,
    handleApplyFilters,
    handleClearFilters,
    getInitialFiltersForForm,
    getAppliedFiltersDisplay,
  };
}
