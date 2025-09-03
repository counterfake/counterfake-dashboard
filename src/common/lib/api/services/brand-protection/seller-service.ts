import { API_ENDPOINTS } from "@/common/lib/config/api";

import { HttpClient } from "../../http-client";
import {
  // Types
  type GetSellersTopFakesParams,
  type GetSellersTopFakesResponse,

  // Schemas
  getSellersTopFakesParamsSchema,
} from "@/common/types/brand-protection/sellers";

export class SellerService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private httpClient: HttpClient) {}

  async getSellersTopFakes(params: GetSellersTopFakesParams) {
    return this.httpClient.get<GetSellersTopFakesResponse>(
      this.endpoints.sellersTopFake,
      { params, validationSchemas: { params: getSellersTopFakesParamsSchema } }
    );
  }
}
