import { API_ENDPOINTS } from "@/common/lib/config/api";

import {
  type GetGroupBrandsParams,
  type GetGroupBrandsResponse,
  getGroupBrandsParamsSchema,
} from "@/common/types/brand-protection/group-brand";

import { HttpClient } from "../../http-client";

export class GroupBrandService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private httpClient: HttpClient) {}

  async getGroupBrands(params: GetGroupBrandsParams) {
    return this.httpClient.get<GetGroupBrandsResponse>(
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
