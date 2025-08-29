import { useQuery } from "@tanstack/react-query";

import { bpApiClient } from "@/lib/api/clients/brand-protection";

import { type GetBrandsParams } from "@/types/brand-protection/brand";

export function useBrands(params: GetBrandsParams) {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => {
      return bpApiClient.brandService.getBrands(params);
    },
  });
}
