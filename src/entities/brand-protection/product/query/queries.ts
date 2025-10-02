import { queryOptions } from "@tanstack/react-query";

import { getProducts } from "@/shared/api/brand-protection/bp-api.service";

import { ProductListQueryParams } from "./types";
import { mapDtoToProductList } from "../model/mappers";

export const productKeys = {
  all: ["product"],
  lists: ["product", "lists"],
  list: (params: ProductListQueryParams) => [...productKeys.lists, params],
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
};
