import { type ApiResponse } from "@/common/types/api";

import { type GetProductByIdResponse } from "@/common/api/bp-api/products";

import { type ProductStatusId } from "./product-status.types";

export type GetProductResultsParams = {
  brand?: string;
  statusId?: ProductStatusId;
  reasons?: string;
  page?: number;
  limit?: number;
  platformId?: string;
  reportStatusIds?: string;
  search?: string;
  url?: string;
  category?: string;
};

export type TransformProductDataParam = GetProductByIdResponse;

export type Product = {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  currency: string;
  coverImage: string;
  images: string[];
  platformName: string;
  platformId: number;
  sellerName: string;
  sellerUrl: string;
  reasons: string[];
  brandName: string;
  brandId: number;
  url: string;
  isRisky: boolean;
  statusId: number;
  status: string;
  reportStatusId: number;
  reportStatus: string;
};

export interface ProductServiceInterface {
  getProductById(id: string): Promise<ApiResponse<Product>>;
  getProductResults(params: GetProductResultsParams): Promise<ApiResponse<any>>;
  transformProduct(product: TransformProductDataParam): Product;
}
