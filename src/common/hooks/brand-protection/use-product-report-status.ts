import { bpApiClient } from "@/common/lib/api/clients/brand-protection";

export function useProductReportStatuses() {
  return bpApiClient.productReportStatusService.getAll();
}

export function useProductReportStatusById(
  id: (typeof bpApiClient.productReportStatusService.ids)[number]
) {
  return bpApiClient.productReportStatusService.getById(id);
}
