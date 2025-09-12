import { type ApiResponse } from "@/common/types/api";

import { type GetResultsAnalysisMonthlyResponse } from "@/common/api/bp-api/results";

import { type ProductStatusId } from "./product-status.types";
import { ProductReportStatusId } from "./product-report-status.type";

export interface MonthlyAnalysisStats {
  // Totals
  totalRiskyProducts: number;
  totalClosedProducts: number;
  totalRiskySellers: number;
  totalClosedSellers: number;
  // Latest Month
  latestMonthRiskyProducts: number;
  latestMonthClosedProducts: number;
  latestMonthRiskySellers: number;
  latestMonthClosedSellers: number;
  // Trends
  riskyProductsTrend: number;
  closedProductsTrend: number;
  riskySellersTrend: number;
  closedSellersTrend: number;
}

export type GetProductAnalysisParams = {
  brand?: string;
  statusId?: ProductStatusId;
  reasons?: string;
  platformId?: string;
  reportStatusIds?: ProductReportStatusId[];
  productName?: string;
  productUrl?: string;
  categoryId?: string;
  sellerShouldHaveProducts?: number;
  sellerProfileId?: string;
};
export type GetProductAnalysisMonthlyParams = {
  brand: string;
  limit?: number;
  sortByMonth?: boolean;
  order?: "asc" | "desc";
};

export type ProductAnalysisMonthlyData = GetResultsAnalysisMonthlyResponse;

export interface ProductAnalysisServiceInterface {
  getProductAnalysis(
    params: GetProductAnalysisParams
  ): Promise<ApiResponse<any>>;
  getProductAnalysisMonthly(
    params: GetProductAnalysisMonthlyParams
  ): Promise<ApiResponse<ProductAnalysisMonthlyData>>;
  calculateMonthlyStats(data: ProductAnalysisMonthlyData): MonthlyAnalysisStats;
}
