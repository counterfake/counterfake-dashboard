"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

import { formatRatingDisplay } from "@/common/lib/utils/convert-rating-5-based";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import { Skeleton } from "@/common/components/ui/primitives/skeleton";
import Rating from "@/common/components/ui/data-display/rating";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/primitives/alert";

interface ProductRatingProps {
  rating: number | null;
  isLoading?: boolean;
}

export default function ProductRating({
  rating,
  isLoading = false,
}: ProductRatingProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const isEmptyRating = rating === null;
  const isRiskyRating = !isEmptyRating && rating < 3;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Customer Rating</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Rating
            rating={rating || 0}
            size="lg"
            activeStarClassName="fill-warning text-warning"
            showRatingCount={false}
          />
          {!isEmptyRating ? (
            <span className="text-xl font-semibold">
              {formatRatingDisplay(rating)}{" "}
              <span className="text-lg text-muted-foreground">/ 5.0</span>
            </span>
          ) : (
            <span className="text-lg font-medium text-muted-foreground">
              No rating available
            </span>
          )}
        </div>

        {/* Warning for low rating */}
        {isRiskyRating && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="text-sm font-medium">
              This product has a low customer rating
            </AlertTitle>
            <AlertDescription className="text-xs mt-1">
              Multiple customers have reported issues with this product
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
