/**
 * Brand Protection Parent Classes Api Layer
 *
 * @description
 * ! This layer is responsible for making API calls to the backend.
 * ! It is a layer between the service and the API client.
 * ! Do not add any business logic here.
 */

import { API_ENDPOINTS } from "@/common/lib/config/api";
import { HttpClient } from "@/common/lib/api/http-client";

import type {
  GetParentClassByIdParams,
  GetParentClassByIdResponse,
  GetParentClassesParams,
  GetParentClassesResponse,
} from "./types";
import {
  getParentClassByIdParamsSchema,
  getParentClassesParamsSchema,
} from "./schemas";

/**
 * Brand Protection Parent Classes Api Layer
 */
export class BpParentClassesApi {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private readonly apiClient: HttpClient) {}

  async getParentClasses(params: GetParentClassesParams) {
    return this.apiClient.get<GetParentClassesResponse>(
      this.endpoints.parentClasses,
      {
        params,
        validationSchemas: {
          params: getParentClassesParamsSchema,
        },
      }
    );
  }

  async getParentClassById(id: string, params?: GetParentClassByIdParams) {
    return this.apiClient.get<GetParentClassByIdResponse>(
      this.endpoints.parentClasses + "/" + id,
      {
        params,
        validationSchemas: {
          params: getParentClassByIdParamsSchema,
        },
      }
    );
  }
}
