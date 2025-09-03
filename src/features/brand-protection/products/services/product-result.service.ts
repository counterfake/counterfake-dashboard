import { API_ENDPOINTS } from "@/common/lib/config/api";
import { HttpClient } from "@/common/lib/api/http-client";
import { MONTHS } from "@/common/lib/data/months";

import {
  // Types
  type GetProductResultsParams,
  type GetProductResultsResponse,
  type GetProductResultsAnalysisParams,
  type GetProductResultsAnalysisResponse,
  type GetProductResultsAnalysisMonthlyParams,
  type GetProductResultsAnalysisMonthlyResponse,
} from "../types/product-result.type";

import {
  getProductResultsAnalysisMonthlyResponseSchema,
  getProductResultsAnalysisParamsSchema,
  getProductResultsParamsSchema,
} from "../schemas/product-result.schemas";

export class ProductResultService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private httpClient: HttpClient) {}

  async getProductResults(params: GetProductResultsParams) {
    return this.httpClient.get<GetProductResultsResponse>(
      this.endpoints.resultsShow,
      {
        params,
        validationSchemas: {
          params: getProductResultsParamsSchema,
        },
      }
    );
  }

  async getProductResultsAnalysis(params: GetProductResultsAnalysisParams) {
    return this.httpClient.get<GetProductResultsAnalysisResponse>(
      this.endpoints.resultsShowAnalysis,
      {
        params,
        validationSchemas: {
          params: getProductResultsAnalysisParamsSchema,
        },
      }
    );
  }

  async getProductResultsAnalysisMonthly(
    params: GetProductResultsAnalysisMonthlyParams
  ) {
    const { brand, sortByMonth = true, order = "desc", limit } = params;

    const response =
      await this.httpClient.get<GetProductResultsAnalysisMonthlyResponse>(
        this.endpoints.resultsShowMonthly,
        {
          params: {
            brand,
          },
          validationSchemas: {
            responseData: getProductResultsAnalysisMonthlyResponseSchema,
          },
        }
      );

    if (response.error) {
      return HttpClient.errorResult(
        response.error,
        "getProductResultsAnalysisMonthly"
      );
    }

    // --------------------------
    // Sort data if sortByMonth is true
    // --------------------------
    if (sortByMonth) {
      // Sort incoming data by year and month
      response.data?.sort((a, b) => {
        const [aMonth, aYear] = a.month.split(" ");
        const [bMonth, bYear] = b.month.split(" ");

        if (aYear !== bYear) {
          return Number(bYear) - Number(aYear);
        }

        return MONTHS.indexOf(bMonth) - MONTHS.indexOf(aMonth);
      });

      if (limit) response.data?.splice(limit);
      if (order === "desc") response.data?.reverse();
    }

    return response;
  }
}
