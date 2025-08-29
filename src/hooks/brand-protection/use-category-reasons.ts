import { bpApiClient } from "@/lib/api/clients/brand-protection";

import { type GetCategoryReasonsParams } from "@/types/brand-protection/category-reasons";
import { useApiQuery } from "../use-http-client";

export function useCategoryReasons(params: GetCategoryReasonsParams) {
  return useApiQuery({
    queryKey: ["category-reasons"],
    queryFn: () => {
      return bpApiClient.categoryReasonService.getCategoryReasons(params);
    },
  });
}
