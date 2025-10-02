"use client";

import React from "react";

import BeamsBackground from "@/common/components/ui/layouts/beams-background";

interface AIAnalysisCardProps {
  children: React.ReactNode;
}

export function AICard({ children }: AIAnalysisCardProps) {
  return (
    <BeamsBackground
      className="bg-transparent h-fit rounded-xl ring-4 ring-primary/10"
      animationSpeed={2}
      animationOpacity={0.7}
    >
      <div className="p-6">{children}</div>
    </BeamsBackground>
  );
}
