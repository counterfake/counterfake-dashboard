import { useApiQuery } from "@/common/hooks/use-http-client";

import { productService } from "../services/product.service";
import {
  type GetProductByIdParams,
  type GetProductsParams,
} from "../types/product.types";

const NAME_SPACE = "products";

interface UseProductsProps {
  params: GetProductsParams;
  options?: {
    enabled?: boolean;
  };
}

export function useProducts({ params, options }: UseProductsProps) {
  return useApiQuery({
    queryKey: [NAME_SPACE, params],
    queryFn: () => productService.getProducts(params),
    ...options,
  });
}

export function useProductById(id: string, params?: GetProductByIdParams) {
  return useApiQuery({
    queryKey: [NAME_SPACE, id, params],
    queryFn: () => productService.getProductById(id, params),
    enabled: !!id,
  });
}
