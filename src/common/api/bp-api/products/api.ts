/**
 * Brand Protection Product Api Layer
 *
 * @description
 * ! This layer is responsible for making API calls to the backend.
 * ! It is a layer between the service and the API client.
 * ! Do not add any business logic here.
 */

import { API_ENDPOINTS } from "@/common/lib/config/api";
import { HttpClient } from "@/common/lib/api/http-client";

import {
  type GetProductByIdParams,
  type GetProductsParams,
  type GetProductsResponse,
  type GetProductByIdResponse,
} from "./types";

import { getProductByIdParamsSchema, getProductsParamsSchema } from "./schemas";

export class BpProductsApi {
  private readonly baseApi = API_ENDPOINTS.bpApi.products;

  constructor(private readonly apiClient: HttpClient) {}

  async getProducts(params: GetProductsParams) {
    return this.apiClient.get<GetProductsResponse>(this.baseApi, {
      params,
      validationSchemas: {
        params: getProductsParamsSchema,
      },
    });
  }

  async getProductById(id: string, params?: GetProductByIdParams) {
    return this.apiClient.get<GetProductByIdResponse>(`${this.baseApi}/${id}`, {
      params,
      validationSchemas: {
        params: getProductByIdParamsSchema,
      },
    });
  }
}
