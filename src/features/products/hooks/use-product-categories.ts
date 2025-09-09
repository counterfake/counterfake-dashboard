import { useApiQuery } from "@/common/hooks/use-http-client";

import { GetProductCategoriesParams } from "../types/product-categories.types";
import { productCategoriesService } from "../services/product-categories.service";

const NAMESPACE = "product-categories";

export function useGetProductCategories(params: GetProductCategoriesParams) {
  return useApiQuery({
    queryKey: [NAMESPACE, params],
    queryFn: () => productCategoriesService.getProductCategories(params),
  });
}
