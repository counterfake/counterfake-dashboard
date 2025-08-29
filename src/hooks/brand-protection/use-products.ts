import { bpApiClient } from "@/lib/api/clients/brand-protection";

import { useApiQuery } from "../use-http-client";

import {
  type GetProductByIdParams,
  type GetProductsParams,
} from "@/types/brand-protection/product";

interface UseProductsProps {
  params: GetProductsParams;
  options?: {
    enabled?: boolean;
  };
}

export function useProducts({ params, options }: UseProductsProps) {
  return useApiQuery({
    queryKey: ["products", params],
    queryFn: () => bpApiClient.productService.getProducts(params),
    ...options,
  });
}

export function useProductById(id: string, params?: GetProductByIdParams) {
  return useApiQuery({
    queryKey: ["product", id, params],
    queryFn: () => bpApiClient.productService.getProductById(id, params),
    enabled: !!id,
  });
}
