/**
 * Brand Protection Results Api Layer
 *
 * @description
 * ! This layer is responsible for making API calls to the backend.
 * ! It is a layer between the service and the API client.
 * ! Do not add any business logic here.
 */

import { API_ENDPOINTS } from "@/common/lib/config/api";
import { HttpClient } from "@/common/lib/api/http-client";

import type {
  GetResultsAnalysisMonthlyParams,
  GetResultsAnalysisMonthlyResponse,
  GetResultsAnalysisParams,
  GetResultsAnalysisResponse,
  GetResultsParams,
  GetResultsResponse,
} from "./types";
import {
  getResultsAnalysisMonthlyParamsSchema,
  getResultsAnalysisMonthlyResponseSchema,
  getResultsAnalysisParamsSchema,
  getResultsParamsSchema,
} from "./schemas";

export class BpResultsApi {
  private readonly endpoints = API_ENDPOINTS.bpApi;

  constructor(private readonly apiClient: HttpClient) {}

  async getResults(params: GetResultsParams) {
    return this.apiClient.get<GetResultsResponse>(this.endpoints.resultsShow, {
      params,
      validationSchemas: {
        params: getResultsParamsSchema,
      },
    });
  }

  async getResultsAnalysis(params: GetResultsAnalysisParams) {
    return this.apiClient.get<GetResultsAnalysisResponse>(
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
    return this.apiClient.get<GetResultsAnalysisMonthlyResponse>(
      this.endpoints.resultsShowMonthly,
      {
        params,
        validationSchemas: {
          params: getResultsAnalysisMonthlyParamsSchema,
          responseData: getResultsAnalysisMonthlyResponseSchema,
        },
      }
    );
  }
}
