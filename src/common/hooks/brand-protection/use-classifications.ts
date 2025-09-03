import { bpApiClient } from "@/common/lib/api/clients/brand-protection";

import { type GetParentClassesParams } from "@/common/types/brand-protection/classification";

import { useApiQuery } from "../use-http-client";

export function useParentClasses(
  params: GetParentClassesParams,
  options?: {
    enabled?: boolean;
  }
) {
  return useApiQuery({
    queryKey: ["parent-classes", params],
    queryFn: () => {
      return bpApiClient.classificationService.getParentClasses(params);
    },
    enabled: !!params.brand,
    ...options,
  });
}
