"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/common/components/ui/primitives/card";
import AppLogo from "@/common/components/ui/data-display/app-logo";
import { Skeleton } from "@/common/components/ui/primitives/skeleton";

import Animate from "@/common/components/ui/animation/animate";

import BeamsBackground from "@/common/components/ui/layouts/beams-background";

import {
  ProductStatusId,
  ProductStatusName,
} from "../../..//types/product-status.types";

// Import modular components
import { AnalysisSummary } from "./components/analysis-summary";
import { ReportReasons } from "./components/report-reasons";
import { ReportCategory } from "./components/report-category";
import { TimeAnalysis } from "./components/time-analysis";
import { RiskAnalysis } from "./components/risk-analysis";

interface ProductAnalysisProps {
  analysis: {
    analysisSummaryText: string;
    reportReasons: string[];
    status: ProductStatusName;
    statusId: ProductStatusId;
    daysSinceListed: number;
    daysSinceReported: number;
    fakeScore: number;
    fakeScoreProbability: string;
    sellerIsRisky: boolean;
    rating: number;
    isLowRating: boolean;
    priceCluster: number;
    imageCaption: string;
  };
  isLoading?: boolean;
}

export function ProductAnalysis({
  analysis,
  isLoading = false,
}: ProductAnalysisProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-28 w-full" />
      </div>
    );
  }

  return (
    <BeamsBackground
      className="bg-transparent h-fit rounded-xl ring-4 ring-primary/10"
      animationSpeed={2}
      animationOpacity={0.7}
    >
      <Card className="bg-transparent w-full">
        <CardHeader>
          <h3 className="text-xl font-semibold leading-none tracking-tight text-foreground">
            <AppLogo withoutText className="inline-block w-10 h-10" />{" "}
            Counterfake Analysis
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Animate
              type="fadeIn"
              duration={0.5}
              delay={0.4}
              triggerOnView
              className="border-b pb-4"
            >
              <AnalysisSummary
                analysisSummaryText={analysis?.analysisSummaryText}
                imageCaptionText={analysis?.imageCaption}
              />
            </Animate>

            <div className="grid grid-cols-2 gap-4">
              <Animate type="fadeIn" duration={0.5} delay={0.4} triggerOnView>
                <ReportReasons reportReasons={analysis?.reportReasons || []} />
              </Animate>

              <Animate type="fadeIn" duration={0.5} delay={0.4} triggerOnView>
                <ReportCategory
                  status={analysis?.status}
                  statusId={analysis?.statusId}
                />
              </Animate>
            </div>

            <Animate type="fadeIn" duration={0.5} delay={0.4} triggerOnView>
              <TimeAnalysis
                daysSinceListed={analysis?.daysSinceListed}
                daysSinceReported={analysis?.daysSinceReported}
              />
            </Animate>

            <Animate type="fadeIn" duration={0.5} delay={0.4} triggerOnView>
              <RiskAnalysis
                fakeScore={analysis?.fakeScore}
                fakeScoreProbability={analysis?.fakeScoreProbability}
                sellerIsRisky={analysis?.sellerIsRisky}
                rating={analysis?.rating}
                isLowRating={analysis?.isLowRating}
                priceCluster={analysis?.priceCluster}
              />
            </Animate>
          </div>
        </CardContent>
      </Card>
    </BeamsBackground>
  );
}
