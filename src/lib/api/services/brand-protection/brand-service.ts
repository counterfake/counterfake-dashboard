import { API_ENDPOINTS } from "@/lib/config/api";

import {
  type GetBrandsParams,
  type GetBrandsResponse,
  getBrandsParamsSchema,
} from "@/types/brand-protection/brand";

import { HttpClient } from "../../http-client";

export class BrandService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private httpClient: HttpClient) {}

  async getBrands(params: GetBrandsParams) {
    return this.httpClient.get<GetBrandsResponse>(this.endpoints.brand, {
      params,
      validationSchemas: {
        params: getBrandsParamsSchema,
      },
    });
  }
}
