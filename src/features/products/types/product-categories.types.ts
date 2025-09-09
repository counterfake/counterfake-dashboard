import { type ApiResponse } from "@/common/types/api";

import { type GetParentClassByIdResponse } from "@/common/api/bp-api/parent-classes";

export type GetProductCategoriesParams = {
  brand?: string;
  doAnalysis?: boolean;
};

export type ProductCategory = GetParentClassByIdResponse;

export interface ProductCategoriesServiceInterface {
  getProductCategories(
    params: GetProductCategoriesParams
  ): Promise<ApiResponse<ProductCategory[]>>;
}
