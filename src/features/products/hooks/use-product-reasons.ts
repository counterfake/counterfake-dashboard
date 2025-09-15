import { useApiQuery } from "@/common/hooks/use-http-client";

import { productReasonsService } from "../services/product-reasons.service";
import { GetProductReasonsParams } from "../types/product-reasons.types";

const NAME_SPACE = "product-reasons";

export function useGetProductReasons(params: GetProductReasonsParams) {
  return useApiQuery({
    queryKey: [NAME_SPACE, params],
    queryFn: () => productReasonsService.getProductReasons(params),
  });
}
