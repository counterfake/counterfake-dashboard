import React from "react";
import { ArrowRight, Search, X } from "lucide-react";

import { cn } from "@/common/lib/utils/ui";

import { Input, InputProps } from "@/common/components/ui/primitives/input";
import { Button } from "../primitives/button";

interface SearchInputProps extends InputProps {
  containerClassName?: string;
  searchButtonClassName?: string;
  clearButtonClassName?: string;
  onClear?: () => void;
  onSearch?: () => void;
  allowClearButton?: boolean;
  allowSearchButton?: boolean;
}

export default function SearchInput({
  containerClassName,
  className,
  searchButtonClassName,
  clearButtonClassName,
  value,
  allowClearButton = true,
  allowSearchButton = true,
  onClear,
  onSearch,
  ...props
}: SearchInputProps) {
  return (
    <div className={cn("flex items-center gap-2", containerClassName)}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          className={cn("pl-10", allowSearchButton && "pr-10", className)}
          value={value}
          {...props}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch?.();
            }
          }}
        />
        <div className="flex gap-1 absolute right-1 top-1/2 transform -translate-y-1/2">
          {value && allowClearButton && (
            <Button
              variant="ghost"
              className={cn(
                "text-muted-foreground hover:bg-muted hover:text-destructive p-0 h-8 w-8 ",
                clearButtonClassName
              )}
              onClick={onClear}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          {allowSearchButton && (
            <Button
              variant="ghost"
              className={cn("p-0 h-8 w-8", searchButtonClassName)}
              onClick={onSearch}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
