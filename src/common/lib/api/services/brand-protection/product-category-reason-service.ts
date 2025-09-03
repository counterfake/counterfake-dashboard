import { API_ENDPOINTS } from "@/common/lib/config/api";

import {
  type GetCategoryReasonsParams,
  type GetCategoryReasonsResponse,
  getCategoryReasonsParamsSchema,
} from "@/common/types/brand-protection/category-reasons";

import { HttpClient } from "../../http-client";

export class CategoryReasonsService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private httpClient: HttpClient) {}

  async getCategoryReasons(params?: GetCategoryReasonsParams) {
    return this.httpClient.get<GetCategoryReasonsResponse>(
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
