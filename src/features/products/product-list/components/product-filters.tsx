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
  onApply: (
    newFilters: Record<keyof ProductFiltersProps["initialFilters"], any>
  ) => void;
  initialFilters: {
    category: string;
    platform: string;
    productCategory: string;
    reason: string;
    reportStatuses: { value: string; label: string }[];
  };
  filterOptions: {
    categories: FilterOption[];
    productCategories: FilterOption[];
    reportStatuses: FilterOption[];
    platforms: FilterOption[];
    reasons: FilterOption[];
  };
}

export default function ProductFilters({
  onClear,
  onApply,
  initialFilters,
  filterOptions,
}: ProductFiltersProps) {
  const [formValues, setFormValues] = useState(initialFilters);

  const hasActiveFilters = Object.values(formValues).some((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return !!value;
  });

  const handleFormValuesChange = (
    key: keyof ProductFiltersProps["initialFilters"],
    value: string | { value: string; label: string }[]
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFormValues({
      category: "",
      platform: "",
      productCategory: "",
      reason: "",
      reportStatuses: [],
    });
    onClear();
  };

  const handleApplyFilters = () => {
    onApply(formValues);
  };

  return (
    <div className="bg-card rounded-lg border p-4 space-y-4 fade-in">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </h3>
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button variant="soft" size="sm" onClick={handleApplyFilters}>
              <Check className="w-4 h-4 mr-2" />
              Apply
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Category Filter */}
        <div>
          <Label className="mb-2">Filter by Category</Label>
          <Select
            value={formValues.category}
            onValueChange={(value) => handleFormValuesChange("category", value)}
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

        {/* Platform Filter */}
        <div>
          <Label className="mb-2">Filter by Platform</Label>
          <Select
            value={formValues.platform}
            onValueChange={(value) => handleFormValuesChange("platform", value)}
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
            value={formValues.productCategory}
            onValueChange={(value) =>
              handleFormValuesChange("productCategory", value)
            }
          >
            <SelectTrigger className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-hidden focus:ring-2 focus:ring-ring">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.productCategories.map((option) => (
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
          <Select
            value={formValues.reason}
            onValueChange={(value) => handleFormValuesChange("reason", value)}
          >
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
            value={formValues.reportStatuses}
            placeholder="Select Status"
            onChange={(value) =>
              handleFormValuesChange("reportStatuses", value)
            }
            emptyIndicator={
              <p className="text-center text-sm">No results found</p>
            }
          />
        </div>
      </div>
    </div>
  );
}
