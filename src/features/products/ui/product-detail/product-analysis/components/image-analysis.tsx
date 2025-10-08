"use client";

import React from "react";
import { RiImageCircleAiFill } from "react-icons/ri";

interface ImageAnalysisProps {
  text?: string;
}

export function ImageAnalysis({ text }: ImageAnalysisProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold flex items-center gap-2">
        <RiImageCircleAiFill className="w-5 h-5 inline-block" />
        Image AI Analysis
      </h4>

      <p className="text-base font-medium text-foreground">{text}</p>
    </div>
  );
}
