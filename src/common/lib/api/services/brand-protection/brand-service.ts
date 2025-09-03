import { API_ENDPOINTS } from "@/common/lib/config/api";

import {
  type GetBrandsParams,
  type GetBrandsResponse,
  getBrandsParamsSchema,
} from "@/common/types/brand-protection/brand";

import { HttpClient } from "../../http-client";

export class BrandService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private httpClient: HttpClient) {}

  async getBrands(params: GetBrandsParams) {
    return this.httpClient.get<GetBrandsResponse>(this.endpoints.brands, {
      params,
      validationSchemas: {
        params: getBrandsParamsSchema,
      },
    });
  }
}
