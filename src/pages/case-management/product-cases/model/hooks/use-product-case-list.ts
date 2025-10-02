import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import {
  caseQueries,
  ProductCaseStatus,
} from "@/entities/brand-protection/case";

interface UseProductCaseListParams {
  status?: ProductCaseStatus;
  limit?: number;
  page?: number;
}

export function useProductCaseList({
  status,
  limit,
  page,
}: UseProductCaseListParams) {
  const { user } = useAuthStore();

  const brands = user?.brand?.ownedBrands;

  const {
    data: productCases,
    isLoading,
    error,
  } = useQuery(
    caseQueries.productCaseList({
      brands,
      status,
      limit,
      page,
    })
  );

  return {
    productCases,
    isLoading,
    error,
  };
}
