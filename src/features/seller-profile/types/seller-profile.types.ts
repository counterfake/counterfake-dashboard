import { GetSellersTopFakesResponse } from "@/common/api/bp-api/sellers";
import { ApiResponse } from "@/common/types/api";

export interface GetSellersTopFakesParams {
  brand: string;
}

export interface SellerProfileServiceInterface {
  getSellersTopFakes(
    params: GetSellersTopFakesParams
  ): Promise<ApiResponse<GetSellersTopFakesResponse>>;
}
