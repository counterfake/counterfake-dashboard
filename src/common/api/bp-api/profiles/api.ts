/**
 * Brand Protection Profile Api Layer
 *
 * @description
 * ! This layer is responsible for making API calls to the backend.
 * ! It is a layer between the service and the API client.
 * ! Do not add any business logic here.
 */

import { API_ENDPOINTS } from "@/common/lib/config/api";
import { HttpClient } from "@/common/lib/api/http-client";

import type { GetProfileByIdParams, GetProfileByIdResponse } from "./types";
import { getProfileByIdParamsSchema } from "./schemas";

/**
 * Brand Protection Profile Api Layer
 */
export class BpProfileApi {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private readonly apiClient: HttpClient) {}

  async getProfileById(id: string, params?: GetProfileByIdParams) {
    return this.apiClient.get<GetProfileByIdResponse>(
      `${this.endpoints.profiles}/${id}`,
      {
        params,
        validationSchemas: {
          params: getProfileByIdParamsSchema,
        },
      }
    );
  }
}
