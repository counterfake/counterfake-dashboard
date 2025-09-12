"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/common/components/ui/primitives/select";
import { Label } from "@/common/components/ui/primitives/label";
import SearchInput from "@/common/components/ui/inputs/search-input";

interface ProductListToolbarProps {
  onLimitChange: (limit: number) => void;
  limit: number;
  initialValue: {
    searchByName: string;
    searchByURL: string;
  };
  onSearchByNameApply: (value: string) => void;
  onSearchByURLApply: (value: string) => void;
  onSearchByNameClear: () => void;
  onSearchByURLClear: () => void;
}

export function ProductListToolbar({
  onLimitChange,
  limit,
  initialValue,
  onSearchByNameApply,
  onSearchByURLApply,
  onSearchByNameClear,
  onSearchByURLClear,
}: ProductListToolbarProps) {
  const [searchByNameValue, setSearchByNameValue] = useState<string>(
    initialValue.searchByName || ""
  );
  const [searchByURLValue, setSearchByURLValue] = useState<string>(
    initialValue.searchByURL || ""
  );

  // Sync local draft inputs when parent-provided initial values change
  useEffect(() => {
    setSearchByNameValue(initialValue.searchByName || "");
  }, [initialValue.searchByName]);
  useEffect(() => {
    setSearchByURLValue(initialValue.searchByURL || "");
  }, [initialValue.searchByURL]);

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
      setSearchByNameValue("");
      onSearchByNameClear();
    } else if (key === "searchByURL") {
      setSearchByURLValue("");
      onSearchByURLClear();
    }
  };

  return (
    <div className="flex flex-wrap justify-between gap-4 mb-4 items-center">
      <div className="flex-1">
        <SearchInput
          value={searchByNameValue}
          onChange={(e) => {
            handleSearchChange("searchByName", e.target.value);
          }}
          onSearch={() => handleApplySearch("searchByName", searchByNameValue)}
          onClear={() => handleClearSearch("searchByName")}
          placeholder="Search products by name..."
        />
      </div>

      <div className="flex-1">
        <SearchInput
          value={searchByURLValue}
          onChange={(e) => handleSearchChange("searchByURL", e.target.value)}
          onSearch={() => handleApplySearch("searchByURL", searchByURLValue)}
          onClear={() => handleClearSearch("searchByURL")}
          placeholder="Search products by URL..."
        />
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Label className="whitespace-nowrap">Per page</Label>
        <Select
          value={String(limit)}
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
    </div>
  );
}
