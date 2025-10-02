import { ProductCaseStatus } from "../model/types";

export interface ProductCaseDetailQueryParams {
  productsLimit?: number;
  productsPage?: number;
}

export interface ProductCaseListQueryParams {
  limit?: number;
  page?: number;
  status?: ProductCaseStatus;
  brands?: number[];
}
