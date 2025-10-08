import { queryOptions } from "@tanstack/react-query";

import { getProfileById } from "@/shared/api/brand-protection/bp-api.service";

import { mapDtoToSellerProfile } from "../model";
import { SellerProfileQueryParams } from "./types";

// Query Keys
export const sellerProfileKeys = {
  all: ["seller-profile"],
  details: ["seller-profile", "details"],
  detail: (id: number, params?: SellerProfileQueryParams) =>
    params
      ? [...sellerProfileKeys.details, id, params]
      : [...sellerProfileKeys.details, id],
};

// Queries
export const sellerProfileQueries = {
  detail: (id: number, params: SellerProfileQueryParams) =>
    queryOptions({
      queryKey: sellerProfileKeys.detail(id, params),
      queryFn: () => {
        const fields = [
          "address",
          "brands",
          "category",
          "email",
          "id",
          "mersis_number",
          "phone_number",
          "platforms",
          "sellers",
          "stats",
          "tax_number",
          "universal_name",
          "is_closed",
          "ai_results",
          "soft_notice",
          "legal_takedown",
        ];
        const expandRelations = [
          "sellers.platform",
          "platforms",
          "stats",
          "brands",
        ];

        return getProfileById(id, {
          brand: params.brandId,
          fields: fields.join(","),
          expand_relations: expandRelations.join(","),
        });
      },
      select: (response) => mapDtoToSellerProfile(response),
      enabled: !!id && !!params.brandId,
    }),
};
