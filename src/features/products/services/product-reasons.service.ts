import { baseApiClient } from "@/common/lib/api/api-client";
import { BpCategoryReasonsApi } from "@/common/api/bp-api/category-reasons";

// Internal Types
import {
  type GetProductReasonsParams,
  type ProductReasonsServiceInterface,
} from "../types/product-reasons.types";

/**
 * Product Reasons Service - Business Logic Layer
 *
 * @description
 * This service gets product reasons from the API layer and performs necessary transformations.
 * It contains only business logic, API requests are made in the API layer.
 */
export class ProductReasonsService implements ProductReasonsServiceInterface {
  private readonly categoryReasonsApi: BpCategoryReasonsApi;

  constructor() {
    this.categoryReasonsApi = new BpCategoryReasonsApi(baseApiClient);
  }

  public async getProductReasons(params?: GetProductReasonsParams) {
    return this.categoryReasonsApi.getCategoryReasons({
      page_size: params?.limit,
      page_number: params?.page,
    });
  }
}

export const productReasonsService = new ProductReasonsService();
