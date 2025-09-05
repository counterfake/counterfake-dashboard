import { useMemo } from "react";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import {
  useProductResults,
  useProductResultsAnalysis,
} from "@/features/brand-protection/products/hooks/use-product-result";
import { useProductReasons } from "@/features/brand-protection/products/hooks/use-product-reasons";
import { useParentClasses } from "@/features/brand-protection/classification/hooks/use-classifications";
import { productReportStatusService } from "@/features/brand-protection/products/services/product-report-status.service";
import { productStatusService } from "@/features/brand-protection/products/services/product-status.service";

import { type ProductFilters } from "./use-products-page-filters";
import { absoluteImageUrl } from "@/common/lib/utils/absolute-image-url";
import { ROUTES } from "@/common/lib/config/routes";

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
  const { user } = useAuthStore();

  // --------------------------
  // Fetch data
  // --------------------------

  // Fetch product data
  const productsResponse = useProductResults(
    {
      brand: user?.brand.id || undefined,
      page_number: currentPage,
      page_size: limit,
      url: filters.searchByURL || null,
      search: filters.searchByName || null,
      category: filters.status,
      platform: filters.platform,
      report: filters.reportStatus,
      parent_product: filters.category,
      product_count: "5",
      category_reasons: filters.reason,
      expand_relations: "seller.profile,platform,images,category_reasons,brand",
      fields:
        "brand,currency,_price_discountedPrice,id,images,platform,_price_realPrice,seller,title_text,url,_category,_related_product,price_actualPrice,category_reasons,rating",
    },
    {
      enabled: !!user?.brand.id,
    }
  );

  // Fetch product analysis data
  const productAnalysisResponse = useProductResultsAnalysis(
    {
      search: filters.searchByName,
      category: filters.status,
      platform: filters.platform,
      report: filters.reportStatus,
      parent_product: filters.category,
      brand: user?.brand.id || undefined,
      product_count: "5",
    },
    {
      enabled: !!user?.brand.id,
    }
  );

  const productReasonsResponse = useProductReasons({
    page_size: 100,
  });

  const parentClassesResponse = useParentClasses(
    {
      brand: user?.brand?.id!,
    },
    {
      enabled: !!user?.brand?.id,
    }
  );

  // --------------------------
  // Data Transforms
  // --------------------------
  const products = useMemo(
    () =>
      productsResponse?.data?.results.map((product) => ({
        id: product.id,
        name: product.title_text,
        price: `${product.price_actualPrice} ${product.currency}`,
        discountedPrice: `${product.price_discountedPrice} ${product.currency}`,
        imageUrl: absoluteImageUrl(product.images[0].path),
        platform: product.platform.name,
        sellerName: product.seller.profile.universal_name,
        sellerUrl: product.seller.profile.universal_name,
        rating: product.rating,
        reasons: product.category_reasons.map((reason) => reason.name),
        brand:
          typeof product.brand === "object"
            ? product.brand?.brand_name
            : "Brand Not Found",
        visitButtonHref: product.url,
        detailsButtonHref: `${ROUTES.USER_DASHBOARD}/products/${product.id}`,
        titleHref: `${ROUTES.USER_DASHBOARD}/products/${product.id}`,
        isRisky: product._category === 1,
      })) || [],
    [productsResponse]
  );
  const productAnalysis = useMemo(
    () => productAnalysisResponse?.data?.platform_analysis || [],
    [productAnalysisResponse]
  );
  const totalPages = useMemo(
    () => productsResponse?.data?.page_count || 1,
    [productsResponse]
  );
  const productReasons = useMemo(
    () => productReasonsResponse?.data?.results || [],
    [productReasonsResponse]
  );
  const productCategories = useMemo(
    () => parentClassesResponse?.data?.parent_classes || [],
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
        value: String(category.index),
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
