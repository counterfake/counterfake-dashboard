import { useApiQuery } from "@/common/hooks/use-http-client";

import { classificationService } from "../services/classification.service";
import { type GetParentClassesParams } from "../types/classification.types";

const NAME_SPACE = "classification";

export function useParentClasses(
  params: GetParentClassesParams,
  options?: {
    enabled?: boolean;
  }
) {
  return useApiQuery({
    queryKey: [NAME_SPACE, "parent-classes", params],
    queryFn: () => {
      return classificationService.getParentClasses(params);
    },
    enabled: !!params.brand,
    ...options,
  });
}
