import { useApiQuery } from "@/common/hooks/use-http-client";

import { productCategoriesService } from "../services/product-categories.service";
import type { GetProductCategoryByIdParams } from "../types/product-categories.types";

const NAMESPACE = "product-categories";

export function useGetProductCategoryById(
  id: number,
  params?: GetProductCategoryByIdParams
) {
  return useApiQuery({
    queryKey: [NAMESPACE, id, params],
    queryFn: () => productCategoriesService.getProductCategoryById(id, params),
    enabled: !!id,
    emptyData: {
      id: null,
      name: "",
      riskyProducts: 0,
      totalProducts: 0,
    },
  });
}
