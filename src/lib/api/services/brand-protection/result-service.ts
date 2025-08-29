import { API_ENDPOINTS } from "@/lib/config/api";

import {
  // Types
  type GetResultsParams,
  type GetResultsResponse,
  type GetResultsAnalysisParams,
  type GetResultsAnalysisResponse,
  type GetResultsAnalysisMonthlyParams,
  type GetResultsAnalysisMonthlyResponse,

  // Schemas
  getResultsParamsSchema,
  getResultsAnalysisParamsSchema,
  getResultsAnalysisMonthlyResponseSchema,
} from "@/types/brand-protection/results";

import { HttpClient } from "../../http-client";
import { MONTHS } from "@/lib/data/months";

export class ResultService {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private httpClient: HttpClient) {}

  async getResults(params: GetResultsParams) {
    return this.httpClient.get<GetResultsResponse>(this.endpoints.resultsShow, {
      params,
      validationSchemas: {
        params: getResultsParamsSchema,
      },
    });
  }

  async getResultsAnalysis(params: GetResultsAnalysisParams) {
    return this.httpClient.get<GetResultsAnalysisResponse>(
      this.endpoints.resultsShowAnalysis,
      {
        params,
        validationSchemas: {
          params: getResultsAnalysisParamsSchema,
        },
      }
    );
  }

  async getResultsAnalysisMonthly(params: GetResultsAnalysisMonthlyParams) {
    const { brand, sortByMonth = true, order = "desc", limit } = params;

    const response =
      await this.httpClient.get<GetResultsAnalysisMonthlyResponse>(
        this.endpoints.resultsShowMonthly,
        {
          params: {
            brand,
          },
          validationSchemas: {
            responseData: getResultsAnalysisMonthlyResponseSchema,
          },
        }
      );

    if (response.error) {
      return HttpClient.errorResult(
        response.error,
        "getResultsAnalysisMonthly"
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
