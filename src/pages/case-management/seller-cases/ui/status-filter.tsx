import React from "react";
import { Button } from "@/shared/ui/primitives/button";
import { Badge } from "@/common/components/ui/primitives/badge";
import { SellerCaseStatus } from "../model";

interface StatusFilterProps {
  selectedStatus?: SellerCaseStatus;
  onStatusChange: (status: SellerCaseStatus | undefined) => void;
}

const statusConfig = {
  [SellerCaseStatus.INITIATED]: {
    label: "Action Initiated",
    variant: "warningSoft" as const,
  },
  [SellerCaseStatus.EXPERT_REVIEW]: {
    label: "Expert Review",
    variant: "infoSoft" as const,
  },
  [SellerCaseStatus.MEDIATION]: {
    label: "In Mediation",
    variant: "primarySoft" as const,
  },
  [SellerCaseStatus.COMPENSATION_RECEIVED]: {
    label: "Compensation Received",
    variant: "successSoft" as const,
  },
  [SellerCaseStatus.CLOSED]: {
    label: "Case Closed",
    variant: "default" as const,
  },
};

export function StatusFilter({
  selectedStatus,
  onStatusChange,
}: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Button
        variant={selectedStatus === undefined ? "default" : "outline"}
        size="sm"
        onClick={() => onStatusChange(undefined)}
        className="h-8"
      >
        All Cases
      </Button>

      <div className="h-4 w-px bg-border mx-1" />

      {Object.entries(statusConfig).map(([status, config]) => (
        <Badge
          key={status}
          variant={config.variant}
          className={`cursor-pointer transition-all ${
            selectedStatus === status
              ? "ring-2 ring-offset-1 ring-primary"
              : "opacity-70 hover:opacity-100"
          }`}
          onClick={() => onStatusChange(status as SellerCaseStatus)}
        >
          {config.label}
        </Badge>
      ))}
    </div>
  );
}
