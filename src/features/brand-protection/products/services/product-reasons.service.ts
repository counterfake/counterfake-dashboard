import { API_ENDPOINTS } from "@/common/lib/config/api";

import {
  type GetCategoryReasonsParams,
  type GetCategoryReasonsResponse,
} from "../types/product-reasons.types";

import { getCategoryReasonsParamsSchema } from "../schemas/product-reasons.schemas";

import { baseApiClient } from "@/common/lib/api/api-client";

export class ProductReasonsService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  async getProductReasons(params?: GetCategoryReasonsParams) {
    return baseApiClient.get<GetCategoryReasonsResponse>(
      this.endpoints.categoryReasons,
      {
        params,
        validationSchemas: {
          params: getCategoryReasonsParamsSchema,
        },
      }
    );
  }
}
