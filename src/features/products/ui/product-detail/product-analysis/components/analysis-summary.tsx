"use client";

import React from "react";
import { PiStarFourFill } from "react-icons/pi";

import { cn } from "@/common/lib/utils/ui";
import { TextReveal } from "@/common/components/ui/animation/text-reveal";

interface AnalysisSummaryProps {
  analysisSummaryText?: string;
}

export function AnalysisSummary({ analysisSummaryText }: AnalysisSummaryProps) {
  return (
    <div className="space-y-1">
      <h4 className="text-lg font-semibold flex items-center gap-2">
        <PiStarFourFill
          className={cn(
            "w-5 h-5 animate-spin duration-[3s] inline-block",
            analysisSummaryText ? "text-primary" : "opacity-50"
          )}
        />
        AI Analysis Summary
      </h4>
      <div className="flex items-start gap-2">
        <TextReveal
          text={`${analysisSummaryText}` || "Analysis summary not available."}
          duration={0.007}
          delay={0.4}
          as="p"
          className={cn(
            "text-base font-medium whitespace-pre-wrap break-words",
            analysisSummaryText ? "text-foreground" : "text-muted-foreground"
          )}
          convertSpacesToNbsp={false}
          triggerOnView
        />
      </div>
    </div>
  );
}
