import { GetSellersTopFakesResponse } from "@/common/api/bp-api/sellers";
import { ApiResponse } from "@/common/types/api";

export interface GetSellersTopFakesParams {
  brand: string;
}

export interface GetSellerProfileByIdParams {
  brand: string;
}

export interface SellerProfileServiceInterface {
  getSellerProfileById(
    id: number,
    params: GetSellerProfileByIdParams
  ): Promise<ApiResponse<any>>;
  getSellersTopFakes(
    params: GetSellersTopFakesParams
  ): Promise<ApiResponse<GetSellersTopFakesResponse>>;
}
