"use client";

import { Check, Filter, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/common/components/ui/primitives/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/common/components/ui/primitives/select";
import { Label } from "@/common/components/ui/primitives/label";

import {
  ListBoxItem,
  ListBox,
} from "@/common/components/ui/primitives/listbox";

interface FilterOption {
  value: string;
  label: string;
}

interface ProductFiltersProps {
  onClearFilters: () => void;
  onApplyFilters: (filters: {
    reason: string;
    reportStatus: string[];
    category: string;
  }) => void;
  onChangeStatus: (status: string) => void;
  onChangePlatform: (platform: string) => void;
  initialValues: {
    category: string;
    status: string;
    reason: string;
    reportStatus: string[];
    platform: string;
  };
  filterOptions: {
    categories: FilterOption[];
    statuses: FilterOption[];
    reasons: FilterOption[];
    reportStatuses: FilterOption[];
    platforms: FilterOption[];
  };
}

export function ProductListSidebar({
  onClearFilters,
  onApplyFilters,
  onChangeStatus,
  onChangePlatform,
  initialValues,
  filterOptions,
}: ProductFiltersProps) {
  const [category, setCategory] = useState(initialValues.category);
  const [reason, setReason] = useState(initialValues.reason);
  const [platform, setPlatform] = useState(initialValues.platform);
  const [status, setStatus] = useState(initialValues.status);
  const [reportStatus, setReportStatus] = useState(
    new Set<string>(
      filterOptions.reportStatuses
        .filter((option) => initialValues.reportStatus.includes(option.value))
        .map((option) => option.value)
    )
  );

  // Sync local state when parent-provided initialValues change
  useEffect(() => {
    setCategory(initialValues.category);
  }, [initialValues.category]);

  useEffect(() => {
    setReason(initialValues.reason);
  }, [initialValues.reason]);

  useEffect(() => {
    setPlatform(initialValues.platform);
  }, [initialValues.platform]);

  useEffect(() => {
    setStatus(initialValues.status);
  }, [initialValues.status]);

  useEffect(() => {
    const next = new Set<string>(
      filterOptions.reportStatuses
        .filter((option) => initialValues.reportStatus.includes(option.value))
        .map((option) => option.value)
    );
    setReportStatus(next);
  }, [initialValues.reportStatus, filterOptions.reportStatuses]);

  const handleClearFilters = () => {
    onClearFilters();
    // Clear local UI state immediately for better UX
    setCategory("");
    setReason("");
    setReportStatus(new Set<string>());
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      category,
      reason,
      reportStatus: Array.from(reportStatus),
    });
  };

  const handleStatusChange = (status: string) => {
    setStatus(status);
    onChangeStatus(status);
  };

  const handlePlatformChange = (platform: string) => {
    setPlatform(platform);
    onChangePlatform(platform);
  };

  return (
    <div className="flex flex-col gap-4 max-w-[200px] h-[calc(100vh-3rem)] overflow-y-auto">
      <div className="space-y-4">
        {/* Status Filter */}
        <div className="space-y-2">
          <Label className="mb-2">Select Status</Label>
          <Select
            value={status}
            onValueChange={(value) => handleStatusChange(value)}
          >
            <SelectTrigger className="w-full h-10 px-3 py-2 text-sm focus-visible:ring-0">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.statuses.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Resets filters when changed
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Platform Filter */}
        <div className="space-y-2">
          <Label className="mb-2">Select Platform</Label>
          <Select
            value={platform}
            onValueChange={(value) => handlePlatformChange(value)}
          >
            <SelectTrigger className="w-full h-10 px-3 py-2 text-sm focus-visible:ring-0">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.platforms.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Resets filters when changed
          </p>
        </div>
      </div>

      <div className="space-y-4 bg-card rounded-lg border p-4">
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </h3>
          <p className="text-xs text-muted-foreground">
            Click apply to apply filters
          </p>
        </div>
        {/* Report Status Filter */}
        <div>
          <Label className="mb-2">Filter by Report Status</Label>
          <ListBox
            selectionMode="multiple"
            items={filterOptions.reportStatuses}
            selectedKeys={reportStatus}
            onSelectionChange={(keys) => setReportStatus(keys as Set<string>)}
          >
            {filterOptions.reportStatuses.map((option) => (
              <ListBoxItem key={option.value} id={option.value}>
                {option.label}
              </ListBoxItem>
            ))}
          </ListBox>
        </div>

        {/* Product Category Filter */}
        <div>
          <Label className="mb-2">Filter by Category</Label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-hidden focus:ring-2 focus:ring-ring">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.categories.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reason Filter */}
        <div>
          <Label className="mb-2">Filter by Reason</Label>
          <Select value={reason} onValueChange={(value) => setReason(value)}>
            <SelectTrigger className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-hidden focus:ring-2 focus:ring-ring">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.reasons.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Button
            variant="soft"
            size="sm"
            onClick={handleApplyFilters}
            className="w-full"
          >
            <Check className="w-4 h-4 mr-2" />
            Apply
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="w-full text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
