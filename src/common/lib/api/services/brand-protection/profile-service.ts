import { API_ENDPOINTS } from "@/common/lib/config/api";

import {
  type GetProfileByIdParams,
  type GetProfileByIdResponse,
  getProfileByIdParamsSchema,
} from "@/common/types/brand-protection/profile";

import { HttpClient } from "../../http-client";

export class ProfileService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private httpClient: HttpClient) {}

  async getProfileById(id: string, params?: GetProfileByIdParams) {
    if (!id) {
      return HttpClient.errorResult(
        new Error("Profile id is required"),
        "ProfileService.getProfileById"
      );
    }

    return this.httpClient.get<GetProfileByIdResponse>(
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
