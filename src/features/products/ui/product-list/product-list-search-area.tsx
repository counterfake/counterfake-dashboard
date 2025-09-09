"use client";

import { useState } from "react";

import { Label } from "@/common/components/ui/primitives/label";

import SearchInput from "@/common/components/ui/inputs/search-input";

interface ProductFiltersProps {
  initialValue: {
    searchByName: string;
    searchByURL: string;
  };
  onSearchByNameApply: (value: string) => void;
  onSearchByURLApply: (value: string) => void;
  onSearchByNameClear: () => void;
  onSearchByURLClear: () => void;
}

export function ProductListSearchArea({
  initialValue,
  onSearchByNameApply,
  onSearchByURLApply,
  onSearchByNameClear,
  onSearchByURLClear,
}: ProductFiltersProps) {
  const [searchByNameValue, setSearchByNameValue] = useState<string>(
    initialValue.searchByName || ""
  );
  const [searchByURLValue, setSearchByURLValue] = useState<string>(
    initialValue.searchByURL || ""
  );

  const handleSearchChange = (
    key: "searchByName" | "searchByURL",
    value: string
  ) => {
    if (key === "searchByName") {
      setSearchByNameValue(value);
    } else if (key === "searchByURL") {
      setSearchByURLValue(value);
    }
  };

  const handleApplySearch = (
    key: "searchByName" | "searchByURL",
    value: string
  ) => {
    if (key === "searchByName") {
      onSearchByNameApply(value);
    } else if (key === "searchByURL") {
      onSearchByURLApply(value);
    }
  };

  const handleClearSearch = (key: "searchByName" | "searchByURL") => {
    if (key === "searchByName") {
      onSearchByNameClear();
    } else if (key === "searchByURL") {
      onSearchByURLClear();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <div>
        <Label className="mb-2">Search Products by Name</Label>
        <SearchInput
          placeholder="Search products by name..."
          value={searchByNameValue}
          onChange={(e) => {
            handleSearchChange("searchByName", e.target.value);
          }}
          onSearch={() => handleApplySearch("searchByName", searchByNameValue)}
          onClear={() => handleClearSearch("searchByName")}
          className="pr-20"
        />
      </div>

      <div>
        <Label className="mb-2">Search Products by URL</Label>
        <SearchInput
          placeholder="Search products by URL..."
          value={searchByURLValue}
          onChange={(e) => handleSearchChange("searchByURL", e.target.value)}
          onSearch={() => handleApplySearch("searchByURL", searchByURLValue)}
          onClear={() => handleClearSearch("searchByURL")}
          className="pr-20"
        />
      </div>
    </div>
  );
}
