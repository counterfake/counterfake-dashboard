"use client";

import React from "react";
import { RefreshCcw } from "lucide-react";

import { Button, ButtonProps } from "../primitives/button";
import { cn } from "@/common/lib/utils/ui";

interface RefreshButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export default function RefreshButton({
  isLoading = false,
  ...props
}: RefreshButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      {...props}
      disabled={isLoading || props.disabled}
    >
      <RefreshCcw
        className={cn(
          "w-4 h-4",
          isLoading && "animate-spin",
          props.children ? "mr-2" : ""
        )}
      />
      {props.children}
    </Button>
  );
}
