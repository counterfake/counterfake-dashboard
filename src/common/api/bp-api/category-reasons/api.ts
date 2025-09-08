/**
 * Brand Protection Category Reasons Api Layer
 *
 * @description
 * ! This layer is responsible for making API calls to the backend.
 * ! It is a layer between the service and the API client.
 * ! Do not add any business logic here.
 */
import { API_ENDPOINTS } from "@/common/lib/config/api";
import { HttpClient } from "@/common/lib/api/http-client";

import {
  type GetCategoryReasonsParams,
  type GetCategoryReasonsResponse,
} from "./types";

import { getCategoryReasonsParamsSchema } from "./schemas";

export class BpCategoryReasonsApi {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private readonly apiClient: HttpClient) {}

  async getCategoryReasons(params?: GetCategoryReasonsParams) {
    return this.apiClient.get<GetCategoryReasonsResponse>(
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
