import { baseApiClient } from "@/common/lib/api/api-client";

import {
  GetSellersTopFakesParams,
  SellerProfileServiceInterface,
} from "../types/seller-profile.types";

import { BpSellersApi } from "@/common/api/bp-api/sellers";

/**
 * Brand Protection Profile Service
 */
export class SellerProfileService implements SellerProfileServiceInterface {
  private readonly sellerApi: BpSellersApi;

  constructor() {
    this.sellerApi = new BpSellersApi(baseApiClient);
  }

  async getSellersTopFakes(params: GetSellersTopFakesParams) {
    return this.sellerApi.getSellersTopFakes(params);
  }
}

export const sellerProfileService = new SellerProfileService();
