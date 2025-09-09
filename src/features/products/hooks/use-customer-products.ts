import { useApiQuery } from "@/common/hooks/use-http-client";
import { useAuthStore } from "@/common/lib/stores/auth-store";

import {
  GetProductAnalysisMonthlyParams,
  GetProductAnalysisParams,
  GetProductResultsParams,
} from "../types/products.types";
import { GetProductCategoriesParams } from "../types/product-categories.types";

import { productCategoriesService } from "../services/product-categories.service";
import { productService } from "../services/product.service";

const NAMESPACE = "customer-products";

export function useGetCustomerProductResults(
  params: Omit<GetProductResultsParams, "brand">
) {
  const { user } = useAuthStore();

  const paramsWithBrand = {
    brand: user?.brand?.id,
    ...params,
  };

  return useApiQuery({
    queryKey: [NAMESPACE, "results", paramsWithBrand],
    queryFn: () => productService.getProductResults(paramsWithBrand),
    enabled: !!user?.brand?.id,
  });
}

export function useGetCustomerProductById(productId: string) {
  const { user } = useAuthStore();

  return useApiQuery({
    queryKey: [NAMESPACE, productId],
    queryFn: () => productService.getProductById(productId),
    enabled: !!user?.brand?.id,
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
    queryKey: [NAMESPACE, "analysis-monthly", paramsWithBrand],
    queryFn: () => productService.getProductAnalysisMonthly(paramsWithBrand),
    enabled: !!user?.brand?.id,
  });
}

export function useGetCustomerProductAnalysis(
  params: Omit<GetProductAnalysisParams, "brand">
) {
  const { user } = useAuthStore();

  const paramsWithBrand = {
    brand: user?.brand?.id,
    ...params,
  };

  return useApiQuery({
    queryKey: [NAMESPACE, "analysis", paramsWithBrand],
    queryFn: () => productService.getProductAnalysis(paramsWithBrand),
    enabled: !!user?.brand?.id,
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
    queryKey: [NAMESPACE, paramsWithBrand],
    queryFn: () =>
      productCategoriesService.getProductCategories(paramsWithBrand),
    enabled: !!user?.brand?.id,
  });
}
