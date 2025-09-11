import { type ApiResponse } from "@/common/types/api";

import { type GetParentClassByIdResponse } from "@/common/api/bp-api/parent-classes";

export type GetProductCategoriesParams = {
  brand?: string;
  doAnalysis?: boolean;
  sortByRiskyCount?: boolean;
};

export type GetProductCategoryByIdParams = {
  doAnalysis?: boolean;
};

export type ProductCategory = {
  name: string;
  id: number;
  riskyProducts: number;
  totalProducts: number;
};

export interface ProductCategoriesServiceInterface {
  getProductCategories(
    params: GetProductCategoriesParams
  ): Promise<ApiResponse<ProductCategory[]>>;
  getProductCategoryById(
    id: number,
    params?: GetProductCategoryByIdParams
  ): Promise<ApiResponse<ProductCategory>>;
  transformProductCategory(
    category: GetParentClassByIdResponse
  ): ProductCategory;
}
