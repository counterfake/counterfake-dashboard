import { queryOptions } from "@tanstack/react-query";

import { getBrands } from "@/shared/api/brand-protection/bp-api.service";

import { HttpClient } from "@/shared/api/http-client";

import type { BrandsQueryParams } from "./brand.types";
import { transformBrandsDtoToBrands } from "./brand.lib";

export const BRANDS_ROOT_QUERY_KEY = ["brand-protection", "brands"] as const;

export const brandsQueryOptions = (params: BrandsQueryParams) => {
  return queryOptions({
    queryKey: [...BRANDS_ROOT_QUERY_KEY, params],
    queryFn: async () => {
      const response = await getBrands({
        group: params.groupBrandId,
        page_number: params.page,
        page_size: params.limit,
      });

      if (!response.success) {
        return HttpClient.errorResult(response.error, "brandsQueryOptions");
      }

      const brands = transformBrandsDtoToBrands(response.data);

      return HttpClient.successResult(brands);
    },
  });
};
