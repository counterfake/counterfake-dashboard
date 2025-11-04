"use client";

import React from "react";

import { GradientBackground } from "@/common/components/ui/layouts/gradient-background";

import { cn } from "@/shared/lib/cn";

interface AIAnalysisCardProps {
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
}

export function AICard({
  children,
  className,
  childrenClassName,
}: AIAnalysisCardProps) {
  return (
    <GradientBackground
      className={cn("h-fit rounded-xl ring-4 ring-primary/10 p-6", className)}
      childrenClassName={childrenClassName}
    >
      {children}
    </GradientBackground>
  );
}
