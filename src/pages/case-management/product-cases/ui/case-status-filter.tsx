import React from "react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/primitives/tabs";

import { ProductCaseStatus } from "@/entities/brand-protection/case";

interface CaseStatusFilterProps {
  onStatusChange: (status: ProductCaseStatus | undefined) => void;
}

export function CaseStatusFilter({ onStatusChange }: CaseStatusFilterProps) {
  const handleValueChange = (value: string) => {
    const status = value === "all" ? undefined : parseInt(value);
    onStatusChange(status);
  };

  return (
    <Tabs
      defaultValue="all"
      onValueChange={handleValueChange}
      className="w-full"
    >
      <TabsList className="w-full justify-start">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value={ProductCaseStatus.IN_PROGRESS.toString()}>
          In Progress
        </TabsTrigger>
        <TabsTrigger value={ProductCaseStatus.FAILED.toString()}>
          Failed
        </TabsTrigger>
        <TabsTrigger value={ProductCaseStatus.COMPLETED.toString()}>
          Completed
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
