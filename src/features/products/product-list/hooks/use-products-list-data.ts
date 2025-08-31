import { useAuthStore } from "@/lib/stores/auth-store";

import {
  useResults,
  useResultsAnalysis,
} from "@/hooks/brand-protection/use-results";
import { useCategoryReasons } from "@/hooks/brand-protection/use-category-reasons";
import { useParentClasses } from "@/hooks/brand-protection/use-classifications";

import { bpApiClient } from "@/lib/api/clients/brand-protection";

import type { ProductFilters } from "./use-products-list-filters";

// Generate filter options
const reportStatusService = bpApiClient.productReportStatusService;

interface UseProductDataProps {
  filters: ProductFilters;
  currentPage: number;
  limit: number;
}

export function useProductsListData({
  filters,
  currentPage,
  limit,
}: UseProductDataProps) {
  const { user } = useAuthStore();

  // --------------------------
  // Fetch data
  // --------------------------

  // Fetch product data
  const productsResponse = useResults(
    {
      brand: user?.brand.id || undefined,
      page_number: currentPage,
      page_size: limit,
      url: filters.searchByURL || null,
      search: filters.searchByName || null,
      category: filters.category,
      platform: filters.platform,
      report: filters.reportStatuses,
      parent_product: filters.productCategory,
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
  const productAnalysisResponse = useResultsAnalysis(
    {
      search: filters.searchByName,
      category: filters.category,
      platform: filters.platform,
      report: filters.reportStatuses,
      parent_product: filters.productCategory,
      brand: user?.brand.id || undefined,
      product_count: "5",
    },
    {
      enabled: !!user?.brand.id,
    }
  );

  const categoryReasonsResponse = useCategoryReasons({
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

  // TODO: Wrap all variables with useMemo

  // Extract data from responses
  const products = productsResponse?.data?.results || [];
  const productAnalysis = productAnalysisResponse?.data;
  const totalPages = productsResponse?.data?.page_count || 1;
  const categoryReasons = categoryReasonsResponse?.data?.results || [];

  // --------------------------
  // Generate filter options
  // --------------------------
  const filterOptions = {
    categories: bpApiClient.productCategoryService.getAll().map((category) => ({
      value: String(category.id),
      label: category.label,
    })),

    productCategories:
      parentClassesResponse?.data?.parent_classes?.map((parentClass) => ({
        value: String(parentClass.index),
        label: parentClass.name,
      })) || [],

    reportStatuses: reportStatusService
      .filterByKeys(
        ["NEW", "TEST_RECEIVED", "CLUSTERED", "REPORT_REQUESTED", "REMOVED"],
        "exclude"
      )
      .map((status) => ({
        value: String(status.id),
        label: status.label,
      })),

    platforms:
      productAnalysis?.platform_analysis?.map((platform) => ({
        value: String(platform.id),
        label: `${platform.name} (${platform.value})`,
      })) || [],

    reasons: categoryReasons.map((reason) => ({
      value: String(reason.index),
      label: reason.name,
    })),
  };

  return {
    // Data
    products,
    productAnalysis,
    totalPages,
    categoryReasons,
    filterOptions,

    // Responses
    productsResponse,
    productAnalysisResponse,
  };
}
