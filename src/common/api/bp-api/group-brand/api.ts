/**
 * Brand Protection Group Brand Api Layer
 *
 * @description
 * ! This layer is responsible for making API calls to the backend.
 * ! It is a layer between the service and the API client.
 * ! Do not add any business logic here.
 */

import { API_ENDPOINTS } from "@/common/lib/config/api";
import { HttpClient } from "@/common/lib/api/http-client";

import type { GetGroupBrandsParams, GetGroupBrandsResponse } from "./types";
import { getGroupBrandsParamsSchema } from "./schemas";

/**
 * Brand Protection Group Brand Api Layer
 */
export class BpGroupBrandApi {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private readonly apiClient: HttpClient) {}

  async getGroupBrands(params: GetGroupBrandsParams) {
    return this.apiClient.get<GetGroupBrandsResponse>(
      this.endpoints.groupBrands,
      {
        params,
        validationSchemas: {
          params: getGroupBrandsParamsSchema,
        },
      }
    );
  }
}
