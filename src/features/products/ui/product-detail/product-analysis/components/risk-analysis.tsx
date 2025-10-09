"use client";

import React from "react";
import {
  Shield,
  ShieldCheck,
  ShieldX,
  UserCheck,
  UserX,
  Star,
  StarOff,
  DollarSign,
  TrendingUp,
  ShieldOff,
} from "lucide-react";

import { cn } from "@/common/lib/utils/ui";

interface RiskAnalysisProps {
  fakeScore?: number | null;
  fakeScoreProbability?: string | null;
  sellerIsRisky?: boolean;
  rating?: number | null;
  isLowRating?: boolean;
  priceCluster?: number | null;
}

export function RiskAnalysis({
  fakeScore,
  fakeScoreProbability,
  sellerIsRisky,
  rating,
  isLowRating,
  priceCluster,
}: RiskAnalysisProps) {
  const hasAnyRiskData =
    fakeScore !== undefined ||
    sellerIsRisky !== undefined ||
    rating !== undefined ||
    priceCluster !== undefined;

  if (!hasAnyRiskData) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h4 className="text-lg font-semibold flex items-center gap-2">
        Risk Analysis
      </h4>

      <div className="grid grid-cols-2 gap-4">
        {/* Fake Score Analysis */}
        <div className="flex items-center justify-between bg-muted/20 rounded-lg px-4 py-3 border">
          <div className="flex items-center gap-3">
            {fakeScore && fakeScore < 0.3 && (
              <ShieldCheck className="h-6 w-6 text-success" />
            )}
            {fakeScore && fakeScore >= 0.3 && fakeScore <= 0.5 && (
              <Shield className="h-6 w-6 text-warning" />
            )}
            {fakeScore && fakeScore > 0.5 && (
              <ShieldX className="h-6 w-6 text-destructive" />
            )}
            {!fakeScore && (
              <ShieldOff className="h-6 w-6 text-muted-foreground" />
            )}
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                Fake Risk Level
              </span>
              <span
                className={cn(
                  "font-semibold text-base",
                  fakeScore && fakeScore < 0.3 && "text-success",
                  fakeScore &&
                    fakeScore >= 0.3 &&
                    fakeScore <= 0.5 &&
                    "text-warning",
                  fakeScore && fakeScore > 0.5 && "text-destructive",
                  !fakeScore && "text-muted-foreground"
                )}
              >
                {fakeScore && fakeScore < 0.3 && "Low-Risk Product"}
                {fakeScore &&
                  fakeScore >= 0.3 &&
                  fakeScore <= 0.5 &&
                  "Medium-Risk Product"}
                {fakeScore && fakeScore > 0.5 && "High-Risk Product"}
                {!fakeScore && "No Data"}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span
              className={cn(
                "text-xl font-bold text-foreground",
                !fakeScoreProbability && "text-muted-foreground"
              )}
            >
              {fakeScoreProbability ? `${fakeScoreProbability}%` : "No Data"}
            </span>
            <p className="text-xs font-normal text-muted-foreground">
              Fake Probability
            </p>
          </div>
        </div>

        {/* Seller Risk Analysis */}
        {sellerIsRisky !== undefined && (
          <div className="flex items-center justify-between bg-muted/20 rounded-lg px-4 py-3 border">
            <div className="flex items-center gap-3">
              {sellerIsRisky ? (
                <UserX className="h-6 w-6 text-destructive" />
              ) : (
                <UserCheck className="h-6 w-6 text-success" />
              )}
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">
                  Seller Risk Status
                </span>
                <span
                  className={cn(
                    "font-semibold text-base",
                    sellerIsRisky ? "text-destructive" : "text-success"
                  )}
                >
                  {sellerIsRisky
                    ? "Suspicious Activity Found"
                    : "No Suspicious Activity"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Rating Analysis */}
        <div className="flex items-center justify-between bg-muted/20 rounded-lg px-4 py-3 border">
          <div className="flex items-center gap-3">
            {rating === null ? (
              <StarOff className="h-6 w-6 text-muted-foreground" />
            ) : isLowRating ? (
              <Star className="h-6 w-6 text-destructive" />
            ) : (
              <Star className="h-6 w-6 text-success" />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-normal text-muted-foreground">
                User Rating
              </span>
              <span
                className={cn(
                  "font-semibold text-base",
                  rating === null && "text-muted-foreground",
                  isLowRating && "text-destructive",
                  !isLowRating && rating !== null && "text-success"
                )}
              >
                {rating === null
                  ? "No Rating Data"
                  : isLowRating
                  ? "Low User Rating"
                  : "Good User Rating"}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span
              className={cn(
                "text-lg font-bold",
                rating ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {rating !== null ? `${rating}/100` : "No Rating Data"}
            </span>
            <p className="text-xs text-muted-foreground">User Rating</p>
          </div>
        </div>

        {/* Price Outlier Analysis */}
        <div className="flex items-center justify-between bg-muted/20 rounded-lg px-4 py-3 border">
          <div className="flex items-center gap-3">
            {priceCluster <= 2 && (
              <DollarSign className="h-6 w-6 text-destructive" />
            )}
            {priceCluster > 2 && priceCluster < 6 && (
              <DollarSign className="h-6 w-6 text-success" />
            )}
            {priceCluster >= 6 && (
              <TrendingUp className="h-6 w-6 text-destructive" />
            )}
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                Price Analysis
              </span>
              <span
                className={cn(
                  "font-semibold text-base",
                  priceCluster <= 2 && "text-destructive",
                  priceCluster > 2 && priceCluster < 6 && "text-success",
                  priceCluster >= 6 && "text-destructive"
                )}
              >
                {priceCluster <= 2 && "Low Pricing"}
                {priceCluster > 2 && priceCluster < 6 && "Normal Pricing"}
                {priceCluster >= 6 && "High Pricing"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
