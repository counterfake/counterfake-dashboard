import { useQuery } from "@tanstack/react-query";

import { sellerProfileService } from "../services/seller-profile.service";
import {
  GetSellerProfileByIdParams,
  GetSellersTopFakesParams,
} from "../types/seller-profile.types";

const NAME_SPACE = "seller-profile";

export function useSellerProfileById(
  id: string,
  params?: GetSellerProfileByIdParams
) {
  return useQuery({
    queryKey: [NAME_SPACE, id, params],
    queryFn: () => sellerProfileService.getSellerProfileById(id, params),
    enabled: !!id,
  });
}

export function useSellersTopFakes(
  params: GetSellersTopFakesParams,
  options?: {
    enabled?: boolean;
  }
) {
  return useQuery({
    queryKey: [NAME_SPACE, "sellers-top-fakes", params],
    queryFn: () => {
      return sellerProfileService.getSellersTopFakes(params);
    },
    enabled: !!params.brand,
    ...options,
  });
}
