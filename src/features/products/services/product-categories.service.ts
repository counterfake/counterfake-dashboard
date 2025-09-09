import { HttpClient } from "@/common/lib/api/http-client";
import { baseApiClient } from "@/common/lib/api/api-client";

// API Layer
import { BpParentClassesApi } from "@/common/api/bp-api/parent-classes";

// Internal Types
import {
  type ProductCategoriesServiceInterface,
  type GetProductCategoriesParams,
} from "../types/product-categories.types";

/**
 * Product Categories Service - Business Logic Layer
 *
 * @description
 * This service gets product categories from the API layer and performs necessary transformations.
 * It contains only business logic, API requests are made in the API layer.
 */

export class ProductCategoriesService
  implements ProductCategoriesServiceInterface
{
  private readonly parentClassesApi: BpParentClassesApi;

  constructor() {
    this.parentClassesApi = new BpParentClassesApi(baseApiClient);
  }

  private getContextKey(methodName: string) {
    return `${this.constructor.name}.${methodName}`;
  }

  public async getProductCategories(params: GetProductCategoriesParams) {
    const response = await this.parentClassesApi.getParentClasses({
      brand: params.brand,
      do_analysis: params.doAnalysis,
    });

    if (!response.success) {
      return HttpClient.errorResult(
        response.error,
        this.getContextKey(this.getProductCategories.name)
      );
    }

    const data = response.data;
    const categories = data?.parent_classes;

    return HttpClient.successResult(categories);
  }
}

export const productCategoriesService = new ProductCategoriesService();
