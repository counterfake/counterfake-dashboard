import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { ProductCaseStatus } from "@/entities/brand-protection/case";

export const STATUS_CONFIG = {
  [ProductCaseStatus.IN_PROGRESS]: {
    label: "In Progress",
    variant: "infoSoft" as const,
    icon: Clock,
  },
  [ProductCaseStatus.FAILED]: {
    label: "Failed",
    variant: "destructiveSoft" as const,
    icon: XCircle,
  },
  [ProductCaseStatus.COMPLETED]: {
    label: "Completed",
    variant: "successSoft" as const,
    icon: CheckCircle2,
  },
};

export const getCaseStatusInfo = (status: ProductCaseStatus) => {
  return STATUS_CONFIG[status];
};
