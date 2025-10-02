import React from "react";

import { PiStarFourFill } from "react-icons/pi";

import { cn } from "@/common/lib/utils/ui";

interface AIIconProps {
  className?: string;
}

export default function AIIcon({ className }: AIIconProps) {
  return (
    <PiStarFourFill
      className={cn(
        "w-5 h-5 animate-spin duration-[3s] inline-block",
        "text-primary",
        className
      )}
    />
  );
}
