import { ProductStatus } from "../model/types";

export type ProductListQueryParams = {
  page: number;
  limit: number;
  search?: string;
  brandId?: string;
  status?: ProductStatus;
  platformId?: number;
  sellerId?: number;
};

export type ClosedCountQueryParams = {
  brandId?: string;
};

export type RiskyCountQueryParams = {
  brandId?: string;
};
