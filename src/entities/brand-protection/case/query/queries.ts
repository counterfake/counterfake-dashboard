import { queryOptions } from "@tanstack/react-query";

import {
  getPlatformReportMail,
  getPlatformReportMails,
} from "@/shared/api/brand-protection/bp-api.service";

import {
  ProductCaseDetailQueryParams,
  ProductCaseListQueryParams,
} from "./types";

import { mapDtoToProductCaseList, mapDtoToProductCase } from "../model/mappers";

export const caseKeys = {
  all: ["case"],
  productCases: () => [...caseKeys.all, "productCases"],
  productCaseDetails: () => [...caseKeys.productCases(), "detail"],
  productCaseDetail: (id: number, params: ProductCaseDetailQueryParams) => [
    ...caseKeys.productCaseDetails(),
    id,
    params,
  ],
  productCaseLists: () => [...caseKeys.productCases(), "list"],
  productCaseList: (params: ProductCaseListQueryParams) => [
    ...caseKeys.productCaseLists(),
    params,
  ],
};

export const caseQueries = {
  productCaseDetail: (id: number, params?: ProductCaseDetailQueryParams) =>
    queryOptions({
      queryKey: caseKeys.productCaseDetail(id, params),
      queryFn: () =>
        getPlatformReportMail(id, {
          page_number: params?.productsPage,
          page_size: params?.productsLimit,
        }),
      select: (data) => mapDtoToProductCase(data),
      enabled: !!id,
    }),
  productCaseList: (params: ProductCaseListQueryParams) =>
    queryOptions({
      queryKey: caseKeys.productCaseList(params),
      queryFn: () =>
        getPlatformReportMails({
          page_number: params.page,
          page_size: params.limit,
          category: params.status,
          brands: params.brands?.join(","),
        }),
      select: (data) => mapDtoToProductCaseList(data),
    }),
};
