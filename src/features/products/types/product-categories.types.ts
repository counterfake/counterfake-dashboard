import { type ApiResponse } from "@/common/types/api";

import { type GetParentClassByIdResponse } from "@/common/api/bp-api/parent-classes";

export type GetProductCategoriesParams = {
  brand?: string;
  doAnalysis?: boolean;
  sortByRiskyCount?: boolean;
};

export type ProductCategory = GetParentClassByIdResponse;

export interface ProductCategoriesServiceInterface {
  getProductCategories(
    params: GetProductCategoriesParams
  ): Promise<ApiResponse<ProductCategory[]>>;
  transformProductCategory(category: ProductCategory): ProductCategory;
}
