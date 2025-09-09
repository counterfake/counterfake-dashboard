"use client";

import { Check, Filter, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/common/components/ui/primitives/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/common/components/ui/primitives/select";
import { Label } from "@/common/components/ui/primitives/label";

import MultipleSelector from "@/common/components/ui/inputs/multiselect";

interface FilterOption {
  value: string;
  label: string;
}

interface ProductFiltersProps {
  onClear: () => void;
  onApply: (filters: ProductFiltersProps["initialValues"]) => void;
  initialValues: {
    category: string;
    platform: string;
    status: string;
    reason: string;
    reportStatus: string[];
  };
  filterOptions: {
    categories: FilterOption[];
    statuses: FilterOption[];
    platforms: FilterOption[];
    reasons: FilterOption[];
    reportStatuses: FilterOption[];
  };
}

export function ProductListFilters({
  onClear,
  onApply,
  initialValues,
  filterOptions,
}: ProductFiltersProps) {
  const [category, setCategory] = useState(initialValues.category);
  const [platform, setPlatform] = useState(initialValues.platform);
  const [reason, setReason] = useState(initialValues.reason);
  const [reportStatus, setReportStatus] = useState(
    filterOptions.reportStatuses.filter((option) =>
      initialValues.reportStatus.includes(option.value)
    )
  );
  const [status, setStatus] = useState(initialValues.status);

  const handleClearFilters = () => {
    onClear();
  };

  const handleApplyFilters = () => {
    onApply({
      category,
      platform,
      reason,
      status,
      reportStatus: reportStatus.map((option) => option.value),
    });
  };

  return (
    <div className="bg-card rounded-lg border p-4 space-y-4 fade-in">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="soft" size="sm" onClick={handleApplyFilters}>
            <Check className="w-4 h-4 mr-2" />
            Apply
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Category Filter */}
        <div>
          <Label className="mb-2">Filter by Status</Label>
          <Select value={status} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-hidden focus:ring-2 focus:ring-ring">
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
        </div>

        {/* Platform Filter */}
        <div>
          <Label className="mb-2">Filter by Platform</Label>
          <Select
            value={platform}
            onValueChange={(value) => setPlatform(value)}
          >
            <SelectTrigger className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-hidden focus:ring-2 focus:ring-ring">
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
        </div>

        {/* Product Category Filter */}
        <div>
          <Label className="mb-2">Filter by Product Category</Label>
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

        {/* Report Status Filter */}
        <div>
          <Label className="mb-2">Filter by Report Status</Label>
          <MultipleSelector
            options={filterOptions.reportStatuses as any}
            value={reportStatus as any}
            placeholder="Select Status"
            onChange={(value) => setReportStatus(value)}
            emptyIndicator={
              <p className="text-center text-sm">No results found</p>
            }
          />
        </div>
      </div>
    </div>
  );
}
