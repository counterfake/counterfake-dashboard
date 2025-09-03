import { API_ENDPOINTS } from "@/common/lib/config/api";

import { baseApiClient } from "@/common/lib/api/api-client";

import {
  GetSellersTopFakesParams,
  GetSellersTopFakesResponse,
  type GetSellerProfileByIdParams,
  type GetSellerProfileByIdResponse,
} from "../types/seller-profile.types";

import {
  getSellerProfileByIdParamsSchema,
  getSellersTopFakesParamsSchema,
} from "../schemas/seller-profile.schemas";

/**
 * Brand Protection Profile Service
 */
export class SellerProfileService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  async getSellerProfileById(id: string, params?: GetSellerProfileByIdParams) {
    if (!id) {
      throw new Error("Seller profile id is required");
    }

    return baseApiClient.get<GetSellerProfileByIdResponse>(
      `${this.endpoints.profiles}/${id}`,
      {
        params,
        validationSchemas: {
          params: getSellerProfileByIdParamsSchema,
        },
      }
    );
  }

  async getSellersTopFakes(params: GetSellersTopFakesParams) {
    return baseApiClient.get<GetSellersTopFakesResponse>(
      this.endpoints.sellersTopFake,
      { params, validationSchemas: { params: getSellersTopFakesParamsSchema } }
    );
  }
}

export const sellerProfileService = new SellerProfileService();
