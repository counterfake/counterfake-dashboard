/**
 * Brand Protection Platforms Api Layer
 *
 * @description
 * ! This layer is responsible for making API calls to the backend.
 * ! It is a layer between the service and the API client.
 * ! Do not add any business logic here.
 */

import { API_ENDPOINTS } from "@/common/lib/config/api";
import { HttpClient } from "@/common/lib/api/http-client";

import { GetPlatformByIdResponse } from "./types";

export class BpPlatformsApi {
  private readonly endpoints = API_ENDPOINTS.bpApi.platforms;

  constructor(private readonly apiClient: HttpClient) {}

  async getPlatformById(id: number) {
    return this.apiClient.get<GetPlatformByIdResponse>(
      `${this.endpoints}/${id}`
    );
  }
}
