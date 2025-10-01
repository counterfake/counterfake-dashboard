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
