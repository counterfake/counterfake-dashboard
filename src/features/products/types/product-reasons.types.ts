import { type ApiResponse } from "@/common/types/api";

import { type GetCategoryReasonsResponse } from "@/common/api/bp-api/category-reasons";

export type GetProductReasonsParams = {
  limit?: number;
  page?: number;
};

export interface ProductReasonsServiceInterface {
  getProductReasons(
    params?: GetProductReasonsParams
  ): Promise<ApiResponse<GetCategoryReasonsResponse>>;
}
