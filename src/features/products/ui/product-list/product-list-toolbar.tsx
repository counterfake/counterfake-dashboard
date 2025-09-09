"use client";

import {
  Filter,
  Download,
  StretchHorizontal,
  Table,
  GalleryHorizontal,
} from "lucide-react";

import { Button } from "@/common/components/ui/primitives/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/common/components/ui/primitives/select";
import { Label } from "@/common/components/ui/primitives/label";

interface ProductListToolbarProps {
  onLayoutChange: (layout: "default" | "compact" | "minimal") => void;
  onLimitChange: (limit: number) => void;
  onFilterOpen: () => void;
  currentLayout: "default" | "compact" | "minimal";
  filterOpen: boolean;
}

export function ProductListToolbar({
  onLayoutChange,
  onLimitChange,
  onFilterOpen,
  currentLayout,
  filterOpen,
}: ProductListToolbarProps) {
  return (
    <div className="flex flex-wrap justify-between gap-4 mb-4">
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

      <div className="flex flex-wrap items-center gap-4">
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
      </div>
    </div>
  );
}
