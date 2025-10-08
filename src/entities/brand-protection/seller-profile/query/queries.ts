import { queryOptions } from "@tanstack/react-query";

import {
  getProfileById,
  getProfiles,
} from "@/shared/api/brand-protection/bp-api.service";

import { mapDtoToSellerCaseList, mapDtoToSellerProfile } from "../model";
import {
  OnlineTakedownCaseListQueryParams,
  LegalTakedownCaseListQueryParams,
  SellerProfileQueryParams,
} from "./types";

// Query Keys
export const sellerProfileKeys = {
  all: ["seller-profile"],
  details: ["seller-profile", "details"],
  detail: (id: number, params?: SellerProfileQueryParams) =>
    params
      ? [...sellerProfileKeys.details, id, params]
      : [...sellerProfileKeys.details, id],
  onlineTakedownCaseLists: () => [
    ...sellerProfileKeys.all,
    "onlineTakedownList",
  ],
  onlineTakedownCaseList: (params: OnlineTakedownCaseListQueryParams) => [
    ...sellerProfileKeys.onlineTakedownCaseLists(),
    params,
  ],
  legalTakedownCaseLists: () => [...sellerProfileKeys.all, "legalTakedownList"],
  legalTakedownCaseList: (params: LegalTakedownCaseListQueryParams) => [
    ...sellerProfileKeys.legalTakedownCaseLists(),
    params,
  ],
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
  onlineTakedownList: (params: OnlineTakedownCaseListQueryParams) =>
    queryOptions({
      queryKey: sellerProfileKeys.onlineTakedownCaseList(params),
      queryFn: () => {
        return getProfiles({
          page_number: params.page,
          page_size: params.limit,
          brands: params.brands.join(","),
          soft_notice: params.softNoticeStatus,
          fields: [
            "id",
            "universal_name",
            "soft_notice",
            "platforms",
            "brands",
          ].join(","),
          expand_relations: ["platforms", "brands"].join(","),
        });
      },
      select: (response) => mapDtoToSellerCaseList(response.data),
    }),
  legalTakedownList: (params: LegalTakedownCaseListQueryParams) =>
    queryOptions({
      queryKey: sellerProfileKeys.legalTakedownCaseList(params),
      queryFn: () =>
        getProfiles({
          page_number: params.page,
          page_size: params.limit,
          brands: params.brands.join(","),
          legal_takedown: params.legalTakedownStatus,
          fields: [
            "id",
            "universal_name",
            "legal_takedown",
            "platforms",
            "brands",
          ].join(","),
          expand_relations: ["platforms", "brands"].join(","),
        }),
      select: (response) => mapDtoToSellerCaseList(response.data),
    }),
};
