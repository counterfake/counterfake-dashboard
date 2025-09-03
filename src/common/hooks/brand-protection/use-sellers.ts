import { bpApiClient } from "@/common/lib/api/clients/brand-protection";

import { GetSellersTopFakesParams } from "@/common/types/brand-protection/sellers";

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
