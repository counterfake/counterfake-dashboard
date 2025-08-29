import { bpApiClient } from "@/lib/api/clients/brand-protection";

import { GetSellersTopFakesParams } from "@/types/brand-protection/sellers";

import { useApiQuery } from "../use-http-client";

export function useSellersTopFakes(
  params: GetSellersTopFakesParams,
  options?: {
    enabled?: boolean;
  }
) {
  return useApiQuery({
    queryKey: ["sellers-top-fakes", params],
    queryFn: () => {
      return bpApiClient.sellerService.getSellersTopFakes(params);
    },
    enabled: !!params.brand,
    ...options,
  });
}
