import React from "react";

import { AICard } from "@/shared/ui/ai/ai-card";
import AIIcon from "@/shared/ui/ai/ai-icon";
import AIText from "@/shared/ui/ai/ai-text";

import { SellerProfile } from "@/entities/brand-protection/seller-profile";

interface AIAnalysisProps {
  profile: SellerProfile;
}

export function AIAnalysis({ profile }: AIAnalysisProps) {
  const aiText =
    typeof profile.aiAnalysisSummary !== "string" || !profile.aiAnalysisSummary
      ? null
      : profile.aiAnalysisSummary;

  if (!aiText) return null;

  return (
    <div>
      <AICard>
        <div className="space-y-2">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <AIIcon />
            AI Analysis Summary
          </h4>
          <AIText
            text={aiText || "AI Analysis Summary not available."}
            className="text-foreground"
          />
        </div>
      </AICard>
    </div>
  );
}
