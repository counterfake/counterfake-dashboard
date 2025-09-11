"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

import { Badge } from "@/common/components/ui/primitives/badge";

import {
  ProductStatusId,
  ProductStatusName,
} from "../../../../types/product-status.types";

interface ReportCategoryProps {
  status?: ProductStatusName;
  statusId?: ProductStatusId;
}

export function ReportCategory({ status, statusId }: ReportCategoryProps) {
  if (!status) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold flex items-center gap-2">
        Report Category
      </h4>

      <Badge
        variant={statusId === 1 ? "destructiveSoft" : "default"}
        size="lg"
        className="px-6"
      >
        {statusId === 1 && <AlertTriangle className="w-4 h-4 mr-2" />}
        {status}
      </Badge>

      <p className="text-sm font-medium text-muted-foreground">
        This product was reported as{" "}
        <span className="text-primary">{status}</span>.
      </p>
    </div>
  );
}
