import { queryOptions } from "@tanstack/react-query";

import {
  getBrands,
  getGroupBrands,
} from "@/shared/api/brand-protection/bp-api.service";

import { HttpClient } from "@/shared/api/http-client";

import type { BrandsQueryParams } from "./brand.types";
import {
  transformBrandsDtoToBrands,
  transformGroupBrandsDtoToBrands,
} from "./brand.lib";

export const BRANDS_ROOT_QUERY_KEY = ["brand-protection", "brands"] as const;

export const brandKeys = {
  all: ["brand-protection", "brands"] as const,
  lists: () => [...brandKeys.all, "lists"],
  list: (params: BrandsQueryParams) => [...brandKeys.lists(), params],
  groupLists: () => [...brandKeys.lists(), "groups"],
  groupList: (params: BrandsQueryParams) => [...brandKeys.groupLists(), params],
};

export const brandQueries = {
  list: (params: BrandsQueryParams) =>
    queryOptions({
      queryKey: brandKeys.list(params),
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
    }),
  groupList: (params: BrandsQueryParams) =>
    queryOptions({
      queryKey: brandKeys.groupList(params),
      queryFn: async () => {
        const response = await getGroupBrands({
          page_size: params.limit,
          page_number: params.page,
        });

        if (!response.success) {
          return HttpClient.errorResult(response.error, "brandsQueryOptions");
        }

        const brands = transformGroupBrandsDtoToBrands(response.data);

        return HttpClient.successResult(brands);
      },
    }),
};
