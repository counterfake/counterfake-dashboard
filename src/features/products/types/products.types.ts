import { type ApiResponse } from "@/common/types/api";

import { type GetProductByIdResponse } from "@/common/api/bp-api/products";

import {
  ProductStatusName,
  type ProductStatusId,
} from "./product-status.types";
import { ProductReportStatusId } from "@/entities/brand-protection/product/model";

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
  sellerShouldHaveProducts?: number;
};

export type Product = {
  // General Info
  id: number;
  name: string;
  coverImage: string;
  images: string[];

  reportStatus: ProductReportStatusId;

  // Ad Information
  ad: {
    description: string;
    url: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercentage: number;
    currency: string;
  };
  // Platform Info
  platform: {
    name: string;
    id: number;
    iconLink: string;
  };
  // Profile Info
  profile: {
    id: number;
    name: string;
    isRisky: boolean;
  };
  // Seller Info
  seller: {
    name: string;
    url: string;
    id: number;
    avatarUrl: string;
  };
  // Brand Info
  brand: {
    name: string;
    id: number;
  };
  // Report / Analysis Info
  analysis: {
    analysisSummaryText: string;
    reportReasons: string[];
    fakeScore: number | null;
    fakeScoreProbability: string | null;
    reportStatusId: ProductReportStatusId;
    reportStatus: string;
    isRisky: boolean;
    statusId: ProductStatusId;
    status: ProductStatusName;
    listedAt: string;
    reportedAt: string;
    daysSinceListed: number;
    daysSinceReported: number;
    isPriceOutlier: boolean;
    rating: number;
    isLowRating: boolean;
    priceCluster: number;
    imageCaption: string;
  };
  subCategory: {
    name: string;
    id: number;
    parentCategoryId: number;
  };
};

export interface ProductServiceInterface {
  getProductById(id: string): Promise<ApiResponse<Product>>;
  getProductResults(params: GetProductResultsParams): Promise<ApiResponse<any>>;
  transformProductResponse(product: GetProductByIdResponse): Product;
}
