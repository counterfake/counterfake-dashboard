import { useQuery } from "@tanstack/react-query";

import { bpApiClient } from "@/common/lib/api/clients/brand-protection";

import { type GetBrandsParams } from "@/common/types/brand-protection/brand";

export function useBrands(params: GetBrandsParams) {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => {
      return bpApiClient.brandService.getBrands(params);
    },
  });
}
