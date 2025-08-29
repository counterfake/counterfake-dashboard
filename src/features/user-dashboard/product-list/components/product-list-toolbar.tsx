"use client";

import { useState } from "react";

import {
  Filter,
  Download,
  CornerDownLeft,
  StretchHorizontal,
  Table,
  GalleryHorizontal,
} from "lucide-react";

import { type UserConfigState } from "@/lib/stores/user-config-store";

import { Button } from "@/components/ui/primitives/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/primitives/select";
import { Label } from "@/components/ui/primitives/label";

import RefreshButton from "@/components/ui/inputs/refresh-button";
import SearchInput from "@/components/ui/inputs/search-input";

interface ProductFiltersProps {
  onSearchApply: (
    key: keyof ProductFiltersProps["initialValues"],
    value: string
  ) => void;
  onSearchClear: (key: keyof ProductFiltersProps["initialValues"]) => void;
  onLayoutChange: (layout: UserConfigState["productGridLayout"]) => void;
  onLimitChange: (limit: number) => void;
  onFilterOpen: () => void;
  currentLayout: UserConfigState["productGridLayout"];
  initialValues: {
    searchByName?: string;
    searchByURL?: string;
  };
  filterOpen: boolean;
}

export default function ProductListToolbar({
  onSearchApply,
  onSearchClear,
  onLayoutChange,
  onLimitChange,
  onFilterOpen,
  currentLayout,
  initialValues,
  filterOpen,
}: ProductFiltersProps) {
  const [searchValues, setSearchValues] = useState({
    searchByName: initialValues.searchByName || "",
    searchByURL: initialValues.searchByURL || "",
  });

  const handleSearchChange = (
    key: keyof ProductFiltersProps["initialValues"],
    value: string
  ) => {
    setSearchValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplySearch = (
    key: keyof ProductFiltersProps["initialValues"],
    value: string
  ) => {
    onSearchApply(key, value);
  };

  const handleClearSearch = (
    key: keyof ProductFiltersProps["initialValues"]
  ) => {
    setSearchValues((prev) => ({
      ...prev,
      [key]: "",
    }));
    onSearchClear(key);
  };

  return (
    <div>
      <div className="flex items-end gap-4 mb-4">
        <div className="flex-1">
          <Label className="mb-2">Search Products by Name</Label>
          <SearchInput
            placeholder="Search products by name..."
            value={searchValues.searchByName}
            onChange={(e) => {
              handleSearchChange("searchByName", e.target.value);
            }}
            onSearch={() =>
              handleApplySearch("searchByName", searchValues.searchByName)
            }
            onClear={() => handleClearSearch("searchByName")}
            className="pr-20"
          />
        </div>

        <div className="flex-1">
          <Label className="mb-2">Search Products by URL</Label>
          <SearchInput
            placeholder="Search products by URL..."
            value={searchValues.searchByURL}
            onChange={(e) => handleSearchChange("searchByURL", e.target.value)}
            onSearch={() =>
              handleApplySearch("searchByURL", searchValues.searchByURL)
            }
            onClear={() => handleClearSearch("searchByURL")}
            className="pr-20"
          />
        </div>
      </div>

      <div className="flex justify-between gap-4 mb-4">
        {/* Card Layout Toggle */}
        <div>
          <div className="flex gap-1 bg-muted p-1 rounded-lg">
            <Button
              size="sm"
              variant={currentLayout === "default" ? "outline" : "ghost"}
              onClick={() => onLayoutChange("default")}
            >
              <GalleryHorizontal className="w-4 h-4 mr-2" />
              Default
            </Button>
            <Button
              size="sm"
              variant={currentLayout === "compact" ? "outline" : "ghost"}
              onClick={() => onLayoutChange("compact")}
            >
              <Table className="w-4 h-4 mr-2" />
              Compact
            </Button>
            <Button
              size="sm"
              variant={currentLayout === "minimal" ? "outline" : "ghost"}
              onClick={() => onLayoutChange("minimal")}
            >
              <StretchHorizontal className="w-4 h-4 mr-2" />
              Minimal
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label className="whitespace-nowrap">Per page</Label>
            <Select
              defaultValue="12"
              onValueChange={(value) => onLimitChange(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 results</SelectItem>
                <SelectItem value="24">24 results</SelectItem>
                <SelectItem value="36">36 results</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Button
              variant={filterOpen ? "default" : "outline"}
              onClick={onFilterOpen}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <div>
            <RefreshButton />
          </div>
        </div>
      </div>
    </div>
  );
}
