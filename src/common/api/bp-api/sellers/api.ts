/**
 * Brand Protection Sellers Api Layer
 *
 * @description
 * ! This layer is responsible for making API calls to the backend.
 * ! It is a layer between the service and the API client.
 * ! Do not add any business logic here.
 */

import { API_ENDPOINTS } from "@/common/lib/config/api";
import { HttpClient } from "@/common/lib/api/http-client";

import type {
  GetSellersTopFakesParams,
  GetSellersTopFakesResponse,
} from "./types";
import { getSellersTopFakesParamsSchema } from "./schemas";

export class BpSellersApi {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private readonly apiClient: HttpClient) {}

  async getSellersTopFakes(params: GetSellersTopFakesParams) {
    return this.apiClient.get<GetSellersTopFakesResponse>(
      this.endpoints.sellersTopFake,
      { params, validationSchemas: { params: getSellersTopFakesParamsSchema } }
    );
  }
}
