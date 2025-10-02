import { useApiQuery } from "@/common/hooks/use-http-client";
import { useAuthStore } from "@/common/lib/stores/auth-store";

// Internal Services
import { productCategoriesService } from "../services/product-categories.service";
import { productService } from "../services/product.service";
import { productAnalysisService } from "../services/product-analysis.service";

// Internal Types
import type { GetProductResultsParams } from "../types/products.types";
import type { GetProductCategoriesParams } from "../types/product-categories.types";
import type {
  GetProductAnalysisMonthlyParams,
  GetProductAnalysisParams,
} from "../types/product-analysis.types";

import { productEmptyData } from "../data/product-empty-data";

export const CUSTOMER_PRODUCTS_NAMESPACE = "customer-products";

export function useGetCustomerProductResults(
  params: Omit<GetProductResultsParams, "brand">
) {
  const { user } = useAuthStore();

  const paramsWithBrand = {
    brand: user?.brand?.id,
    ...params,
  };

  return useApiQuery({
    queryKey: [CUSTOMER_PRODUCTS_NAMESPACE, "results", paramsWithBrand],
    queryFn: () => productService.getProductResults(paramsWithBrand),
    enabled: !!user?.brand?.id,
    emptyData: {
      limit: 0,
      page: 0,
      totalPages: 0,
      totalProducts: 0,
      products: [],
    },
  });
}

export function useGetCustomerProductById(productId: string) {
  const { user } = useAuthStore();

  return useApiQuery({
    queryKey: [CUSTOMER_PRODUCTS_NAMESPACE, productId],
    queryFn: () => productService.getProductById(productId),
    enabled: !!user?.brand?.id || !!productId,
    emptyData: productEmptyData,
  });
}

export function useGetCustomerProductCategories(
  params: Omit<GetProductCategoriesParams, "brand">
) {
  const { user } = useAuthStore();

  const paramsWithBrand = {
    brand: user?.brand?.id,
    ...params,
  };

  return useApiQuery({
    queryKey: [CUSTOMER_PRODUCTS_NAMESPACE, "categories", paramsWithBrand],
    queryFn: () =>
      productCategoriesService.getProductCategories(paramsWithBrand),
    enabled: !!user?.brand?.id,
    emptyData: [],
  });
}

// --------------------------
// Analysis Hooks
// --------------------------
export function useGetCustomerProductAnalysis(
  params: Omit<GetProductAnalysisParams, "brand">
) {
  const { user } = useAuthStore();

  const paramsWithBrand = {
    brand: user?.brand?.id,
    ...params,
  };

  return useApiQuery({
    queryKey: [CUSTOMER_PRODUCTS_NAMESPACE, "analysis", paramsWithBrand],
    queryFn: () => productAnalysisService.getProductAnalysis(paramsWithBrand),
    enabled: !!user?.brand?.id,
    emptyData: {
      platforms: [],
      sellers: [],
      totalProducts: 0,
    },
  });
}

export function useGetCustomerProductAnalysisMonthly(
  params: Omit<GetProductAnalysisMonthlyParams, "brand">
) {
  const { user } = useAuthStore();

  const paramsWithBrand = {
    brand: user?.brand?.id,
    ...params,
  };

  return useApiQuery({
    queryKey: [
      CUSTOMER_PRODUCTS_NAMESPACE,
      "analysis-monthly",
      paramsWithBrand,
    ],
    queryFn: () =>
      productAnalysisService.getProductAnalysisMonthly(paramsWithBrand),
    enabled: !!user?.brand?.id,
    emptyData: [],
  });
}
