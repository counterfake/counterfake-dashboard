import { useQuery } from "@tanstack/react-query";

import { caseQueries } from "@/entities/brand-protection/case";

interface UseProductCaseProductsParams {
  productsPage?: number;
  productsLimit?: number;
  enabled?: boolean;
}

export function useProductCaseProducts(
  caseId: number,
  params?: UseProductCaseProductsParams
) {
  const {
    data: productCase,
    isLoading,
    error,
  } = useQuery({
    ...caseQueries.productCaseDetail(caseId, {
      productsPage: params?.productsPage,
      productsLimit: params?.productsLimit,
    }),
    enabled: params?.enabled ?? true,
  });

  return {
    products: productCase?.products,
    isLoading,
    error,
  };
}
