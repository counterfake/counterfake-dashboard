import { API_ENDPOINTS } from "@/lib/config/api";

import {
  type GetGroupBrandsParams,
  type GetGroupBrandsResponse,
  getGroupBrandsParamsSchema,
} from "@/types/brand-protection/group-brand";

import { HttpClient } from "../../http-client";

export class GroupBrandService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private httpClient: HttpClient) {}

  async getGroupBrands(params: GetGroupBrandsParams) {
    return this.httpClient.get<GetGroupBrandsResponse>(
      this.endpoints.groupBrand,
      {
        params,
        validationSchemas: {
          params: getGroupBrandsParamsSchema,
        },
      }
    );
  }
}
