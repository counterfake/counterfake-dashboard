import React from "react";

import { cn } from "@/common/lib/utils/ui";

const variants = {
  size: {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  },
};

interface SpinnerProps {
  size?: keyof typeof variants.size;
  className?: string;
}

export default function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "inline-block border-2 border-primary/20 border-t-primary rounded-full animate-spin",
        variants.size[size],
        className
      )}
    />
  );
}
