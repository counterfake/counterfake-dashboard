"use client";

import React from "react";
import { PiStarFourFill } from "react-icons/pi";

import { cn } from "@/common/lib/utils/ui";
import { TextReveal } from "@/common/components/ui/animation/text-reveal";
import { Fullscreen } from "lucide-react";
import Animate from "@/common/components/ui/animation/animate";

interface AnalysisSummaryProps {
  analysisSummaryText?: string;
  imageCaptionText?: string;
}

export function AnalysisSummary({
  analysisSummaryText,
  imageCaptionText,
}: AnalysisSummaryProps) {
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
          duration={0.01}
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

      {imageCaptionText ? (
        <Animate type="fadeIn" duration={0.5} delay={1} triggerOnView>
          <div className="mt-5 space-y-2">
            <h5 className="flex items-center gap-2 text-base font-semibold">
              <Fullscreen className="w-5 h-5" />
              Image Caption
            </h5>

            <div>
              <p className="text-base font-medium text-foreground">
                {imageCaptionText}
              </p>
            </div>
          </div>
        </Animate>
      ) : null}
    </div>
  );
}
