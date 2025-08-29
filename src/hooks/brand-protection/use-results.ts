import { bpApiClient } from "@/lib/api/clients/brand-protection";

import {
  GetResultsAnalysisMonthlyParams,
  type GetResultsAnalysisParams,
  type GetResultsParams,
} from "@/types/brand-protection/results";
import { useApiQuery } from "../use-http-client";

export function useResults(
  params: GetResultsParams,
  options?: {
    enabled?: boolean;
  }
) {
  return useApiQuery({
    queryKey: ["results", params],
    queryFn: () => {
      return bpApiClient.resultService.getResults(params);
    },
    enabled: !!params.brand,
    ...options,
  });
}

export function useResultsAnalysis(
  params: GetResultsAnalysisParams,
  options?: {
    enabled?: boolean;
  }
) {
  return useApiQuery({
    queryKey: ["results-analysis", params],
    queryFn: () => {
      return bpApiClient.resultService.getResultsAnalysis(params);
    },
    enabled: !!params.brand,
    ...options,
  });
}

export function useResultAnalysisMonthly(
  params: GetResultsAnalysisMonthlyParams,
  options?: {
    enabled?: boolean;
  }
) {
  return useApiQuery({
    queryKey: ["results-analysis-monthly", params],
    queryFn: () => {
      return bpApiClient.resultService.getResultsAnalysisMonthly(params);
    },
    enabled: !!params.brand,
    ...options,
  });
}
