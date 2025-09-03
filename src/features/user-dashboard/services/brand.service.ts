import { API_ENDPOINTS } from "@/common/lib/config/api";

import { baseApiClient } from "@/common/lib/api/api-client";
import {
  GetBrandsParams,
  GetBrandsResponse,
  GetGroupBrandsParams,
  GetGroupBrandsResponse,
} from "../types/brand.types";
import {
  getBrandsParamsSchema,
  getGroupBrandsParamsSchema,
} from "../schemas/brand.schemas";

/**
 * Brand Protection Brand Service
 */
export class BrandService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  async getBrands(params: GetBrandsParams) {
    return baseApiClient.get<GetBrandsResponse>(this.endpoints.brands, {
      params,
      validationSchemas: {
        params: getBrandsParamsSchema,
      },
    });
  }

  async getGroupBrands(params: GetGroupBrandsParams) {
    return baseApiClient.get<GetGroupBrandsResponse>(
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

export const brandService = new BrandService();
