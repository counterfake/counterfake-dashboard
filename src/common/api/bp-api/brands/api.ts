/**
 * Brand Protection Brands Api Layer
 *
 * @description
 * ! This layer is responsible for making API calls to the backend.
 * ! It is a layer between the service and the API client.
 * ! Do not add any business logic here.
 */

import { API_ENDPOINTS } from "@/common/lib/config/api";
import { HttpClient } from "@/common/lib/api/http-client";

import type { GetBrandsParams, GetBrandsResponse } from "./types";
import { getBrandsParamsSchema } from "./schemas";

/**
 * Brand Protection Brands Api Layer
 */
export class BpBrandsApi {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private readonly apiClient: HttpClient) {}

  async getBrands(params: GetBrandsParams) {
    return this.apiClient.get<GetBrandsResponse>(this.endpoints.brands, {
      params,
      validationSchemas: {
        params: getBrandsParamsSchema,
      },
    });
  }
}
