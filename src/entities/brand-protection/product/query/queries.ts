import { queryOptions } from "@tanstack/react-query";

import { getProducts } from "@/shared/api/brand-protection/bp-api.service";

import {
  ClosedCountQueryParams,
  ProductListQueryParams,
  RiskyCountQueryParams,
} from "./types";
import {
  mapDtoToClosedCount,
  mapDtoToProductList,
  mapDtoToRiskyCount,
} from "../model/mappers";
import { ProductStatus } from "../model";

export const productKeys = {
  all: ["product"],
  lists: () => [...productKeys.all, "lists"],
  list: (params: ProductListQueryParams) => [...productKeys.lists(), params],
  closedCounts: () => [...productKeys.all, "closedCounts"],
  closedCount: (params: ClosedCountQueryParams) => [
    ...productKeys.closedCounts(),
    params,
  ],
  riskyCounts: () => [...productKeys.all, "riskyCounts"],
  riskyCount: (params: RiskyCountQueryParams) => [
    ...productKeys.riskyCounts(),
    params,
  ],
};

export const productQueries = {
  list: (params: ProductListQueryParams) =>
    queryOptions({
      queryKey: productKeys.list(params),
      queryFn: () => {
        const fields = [
          "currency",
          "discountedPrice",
          "id",
          "images",
          "platform",
          "price_actualPrice",
          "realPrice",
          "seller",
          "title_text",
          "url",
          "_category",
          "_price_discountedPrice",
          "_price_realPrice",
        ];
        const expandRelations = ["seller.profile", "images", "platform"];

        return getProducts({
          page_size: params.limit,
          page_number: params.page,
          brand: params.brandId,
          hidden_classes: false,
          platform: params.platformId,
          seller: params.sellerId,
          category: params.status,
          search: params.search,
          profile: params.platformId,
          fields: fields.join(","),
          expand_relations: expandRelations.join(","),
        });
      },
      select: (data) => mapDtoToProductList(data),
      enabled: !!params.brandId,
    }),
  closedCount: (params: ClosedCountQueryParams) =>
    queryOptions({
      queryKey: productKeys.closedCount(params),

      queryFn: () => {
        return getProducts({
          page_size: 1,
          page_number: 1,
          fields: "id",
          is_closed: true,
          brand: params.brandId,
          include_hidden_entities: true,
        });
      },
      select: (data) => mapDtoToClosedCount(data),
      enabled: !!params.brandId,
    }),
  riskyCount: (params: RiskyCountQueryParams) =>
    queryOptions({
      queryKey: productKeys.riskyCount(params),

      queryFn: () => {
        return getProducts({
          page_size: 1,
          page_number: 1,
          fields: "id",
          category: ProductStatus.Risky,
          brand: params.brandId,
          include_hidden_entities: true,
        });
      },
      select: (data) => mapDtoToRiskyCount(data),
      enabled: !!params.brandId,
    }),
};
