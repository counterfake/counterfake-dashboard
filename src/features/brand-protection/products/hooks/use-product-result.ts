import { useApiQuery } from "@/common/hooks/use-http-client";

import {
  GetProductResultsAnalysisMonthlyParams,
  GetProductResultsAnalysisParams,
  GetProductResultsParams,
} from "../types/product-result.type";

import { productResultService } from "../services/product-result.service";

const NAME_SPACE = "product-results";

export function useProductResults(
  params: GetProductResultsParams,
  options?: {
    enabled?: boolean;
  }
) {
  return useApiQuery({
    queryKey: [NAME_SPACE, params],
    queryFn: () => {
      return productResultService.getProductResults(params);
    },
    enabled: !!params.brand,
    ...options,
  });
}

export function useProductResultsAnalysis(
  params: GetProductResultsAnalysisParams,
  options?: {
    enabled?: boolean;
  }
) {
  return useApiQuery({
    queryKey: [NAME_SPACE, "analysis", params],
    queryFn: () => {
      return productResultService.getProductResultsAnalysis(params);
    },
    enabled: !!params.brand,
    ...options,
  });
}

export function useProductResultsAnalysisMonthly(
  params: GetProductResultsAnalysisMonthlyParams,
  options?: {
    enabled?: boolean;
  }
) {
  return useApiQuery({
    queryKey: [NAME_SPACE, "analysis-monthly", params],
    queryFn: () => {
      return productResultService.getProductResultsAnalysisMonthly(params);
    },
    enabled: !!params.brand,
    ...options,
  });
}
