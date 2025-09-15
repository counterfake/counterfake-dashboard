import { baseApiClient } from "@/common/lib/api/api-client";
import { HttpClient } from "@/common/lib/api/http-client";
import { MONTHS } from "@/common/lib/data/months";

// API Layer Imports
import { BpResultsApi } from "@/common/api/bp-api/results";

// Internal Types
import {
  type ProductAnalysisServiceInterface,
  type GetProductAnalysisMonthlyParams,
  type GetProductAnalysisParams,
  type MonthlyAnalysisStats,
  ProductAnalysisMonthlyData,
} from "../types/product-analysis.types";

/**
 * Product Analysis Service - Business Logic Layer
 *
 * @description
 * This service gets product data from the API layer and performs necessary transformations.
 * It contains only business logic, API requests are made in the API layer.
 */
export class ProductAnalysisService implements ProductAnalysisServiceInterface {
  // APIs
  private readonly resultsApi: BpResultsApi;

  // --------------------------
  // ! Main Constructor Function
  // --------------------------
  constructor() {
    // APIs
    this.resultsApi = new BpResultsApi(baseApiClient);
  }

  // --------------------------
  // Debugging
  // --------------------------
  private getContextKey(funcName: string) {
    return `${this.constructor.name}.${funcName}`;
  }

  // --------------------------
  // Business Logic
  // --------------------------
  public async getProductAnalysis(params: GetProductAnalysisParams) {
    const result = await this.resultsApi.getResultsAnalysis({
      brand: params.brand,
      category: String(params.statusId),
      parent_product: params.categoryId,
      platform: params.platformId,
      report: params.reportStatusIds.join(","),
      search: params.productName,
      url: params.productUrl,
      product_count: String(params.sellerShouldHaveProducts),
      profile: params.sellerProfileId,
    });

    if (!result.success) {
      return HttpClient.errorResult(
        result.error,
        this.getContextKey(this.getProductAnalysis.name)
      );
    }

    const data = result.data;

    return HttpClient.successResult({
      sellers: data.seller_analysis,
      platforms: data.platform_analysis,
      totalProducts: data.count,
    });
  }

  public async getProductAnalysisMonthly(
    params: GetProductAnalysisMonthlyParams
  ) {
    const { brand, sortByMonth = true, order = "desc", limit } = params;

    const result = await this.resultsApi.getResultsAnalysisMonthly({ brand });

    if (!result.success) {
      return HttpClient.errorResult(
        result.error,
        this.getContextKey(this.getProductAnalysisMonthly.name)
      );
    }

    const monthlyData = result.data;

    // --------------------------
    // Sort data if sortByMonth is true - Business Logic
    // --------------------------
    if (sortByMonth && monthlyData) {
      // Sort incoming data by year and month
      monthlyData.sort((a, b) => {
        const [aMonth, aYear] = a.month.split(" ");
        const [bMonth, bYear] = b.month.split(" ");

        if (aYear !== bYear) {
          return Number(bYear) - Number(aYear);
        }

        return MONTHS.indexOf(bMonth) - MONTHS.indexOf(aMonth);
      });

      if (limit) monthlyData.splice(limit);
      if (order === "desc") monthlyData.reverse();
    }

    for (let i = 0; i < monthlyData.length; i++) {
      const item = monthlyData[i];
      item.month = new Date(item.month).toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });
    }

    return result;
  }

  public calculateMonthlyStats(
    data: ProductAnalysisMonthlyData
  ): MonthlyAnalysisStats {
    if (!data || data.length === 0) {
      return {
        totalRiskyProducts: 0,
        totalClosedProducts: 0,
        totalRiskySellers: 0,
        totalClosedSellers: 0,

        latestMonthRiskyProducts: 0,
        latestMonthClosedProducts: 0,
        latestMonthRiskySellers: 0,
        latestMonthClosedSellers: 0,

        riskyProductsTrend: 0,
        closedProductsTrend: 0,
        riskySellersTrend: 0,
        closedSellersTrend: 0,
      };
    }

    // --------------------------
    // Calculate total data
    // --------------------------
    const totalRiskyProducts = data.reduce(
      (sum, item) => sum + item.risky_product_count,
      0
    );
    const totalClosedProducts = data.reduce(
      (sum, item) => sum + item.closed_product_count,
      0
    );
    const totalRiskySellers = data.reduce(
      (sum, item) => sum + item.risky_seller_count,
      0
    );
    const totalClosedSellers = data.reduce(
      (sum, item) => sum + item.closed_seller_count,
      0
    );

    // --------------------------
    // Calculate latest month data
    // --------------------------
    const latestMonth = data[data.length - 1];
    const previousMonth = data[data.length - 2];

    const latestMonthRiskyProducts = latestMonth?.risky_product_count || 0;
    const latestMonthClosedProducts = latestMonth?.closed_product_count || 0;
    const latestMonthRiskySellers = latestMonth?.risky_seller_count || 0;
    const latestMonthClosedSellers = latestMonth?.closed_seller_count || 0;

    // --------------------------
    // Calculate trends data
    // --------------------------
    const riskyProductsTrend =
      previousMonth && latestMonth
        ? latestMonth.risky_product_count - previousMonth.risky_product_count
        : 0;

    const closedProductsTrend =
      previousMonth && latestMonth
        ? latestMonth.closed_product_count - previousMonth.closed_product_count
        : 0;

    const riskySellersTrend =
      previousMonth && latestMonth
        ? latestMonth.risky_seller_count - previousMonth.risky_seller_count
        : 0;

    const closedSellersTrend =
      previousMonth && latestMonth
        ? latestMonth.closed_seller_count - previousMonth.closed_seller_count
        : 0;

    return {
      // Totals
      totalRiskyProducts,
      totalClosedProducts,
      totalRiskySellers,
      totalClosedSellers,
      // Latest Month
      latestMonthRiskyProducts,
      latestMonthClosedProducts,
      latestMonthRiskySellers,
      latestMonthClosedSellers,
      // Trends
      riskyProductsTrend,
      closedProductsTrend,
      riskySellersTrend,
      closedSellersTrend,
    };
  }
}

export const productAnalysisService = new ProductAnalysisService();
