import { bpApiClient } from "@/common/lib/api/clients/brand-protection";

import { GetCategoryReasonsResponse } from "@/common/types/brand-protection/category-reasons";
import { GetParentClassesResponse } from "@/common/types/brand-protection/classification";
import { GetResultsAnalysisResponse } from "@/common/types/brand-protection/results";

// Generate filter options
const reportStatusService = bpApiClient.productReportStatusService;
const categoryService = bpApiClient.productCategoryService;

interface UseProductListFilterOptionsProps {
  parentClassesData: GetParentClassesResponse["parent_classes"];
  productAnalysis: GetResultsAnalysisResponse["platform_analysis"];
  categoryReasons: GetCategoryReasonsResponse["results"];
}

export function useProductListFilterOptions({
  parentClassesData,
  productAnalysis,
  categoryReasons,
}: UseProductListFilterOptionsProps) {
  return {
    categories: categoryService.getAll().map((category) => ({
      value: String(category.id),
      label: category.label,
    })),

    productCategories:
      parentClassesData?.map((parentClass) => ({
        value: String(parentClass.index),
        label: parentClass.name,
      })) || [],

    reportStatuses: reportStatusService
      .filterByKeys(
        ["NEW", "TEST_RECEIVED", "CLUSTERED", "REPORT_REQUESTED", "REMOVED"],
        "exclude"
      )
      .map((status) => ({
        value: String(status.id),
        label: status.label,
      })),

    platforms:
      productAnalysis?.map((platform) => ({
        value: String(platform.id),
        label: `${platform.name} (${platform.value})`,
      })) || [],

    reasons: categoryReasons.map((reason) => ({
      value: String(reason.index),
      label: reason.name,
    })),
  };
}
