import { baseApiClient } from "@/common/lib/api/api-client";

import {
  type SellerProfileServiceInterface,
  type GetSellerProfileByIdParams,
  type GetSellersTopFakesParams,
} from "../types/seller-profile.types";

import { BpSellersApi } from "@/common/api/bp-api/sellers";
import { BpProfileApi } from "@/common/api/bp-api/profiles";

/**
 * Brand Protection Profile Service
 */
export class SellerProfileService implements SellerProfileServiceInterface {
  private readonly sellerApi: BpSellersApi;
  private readonly profileApi: BpProfileApi;

  constructor() {
    this.sellerApi = new BpSellersApi(baseApiClient);
    this.profileApi = new BpProfileApi(baseApiClient);
  }

  async getSellerProfileById(id: number, params: GetSellerProfileByIdParams) {
    return this.profileApi.getProfileById(String(id), {
      brand: params.brand,
    });
  }

  async getSellersTopFakes(params: GetSellersTopFakesParams) {
    return this.sellerApi.getSellersTopFakes(params);
  }
}

export const sellerProfileService = new SellerProfileService();
