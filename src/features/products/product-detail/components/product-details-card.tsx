"use client";

import React from "react";
import {
  AlertTriangle,
  FileText,
  SearchCheck,
  DollarSign,
  CircleUserRound,
  FlagTriangleRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/primitives/tabs";
import { Skeleton } from "@/common/components/ui/primitives/skeleton";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/primitives/alert";
import AppLogo from "@/common/components/ui/data-display/app-logo";

interface ProductDetailsCardProps {
  productDescription: string;
  isLoading?: boolean;
  reportData: {
    reportReasons: string[];
    isRiskyRating: boolean;
    isRatingAvailable: boolean;
    isPriceOutlier: boolean;
    isRiskySeller: boolean;
  };
}

export default function ProductDetailsCard({
  reportData,
  productDescription,
  isLoading = false,
}: ProductDetailsCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const reportDetails = [
    {
      title: "Report Reason",
      description:
        reportData.reportReasons.length > 0 ? (
          <>
            <p>This product was reported for:</p>
            <ul className="list-inside list-disc text-sm font-medium">
              {reportData.reportReasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </>
        ) : (
          "Report reason not available yet."
        ),
      isRisky: reportData.reportReasons.length > 0,
      icon: FlagTriangleRight,
    },
    {
      title: "Customer Rating",
      description:
        reportData.isRatingAvailable && reportData.isRiskyRating
          ? "This product has a low customer rating"
          : "No suspicious circumstances were encountered.",
      isRisky: reportData.isRatingAvailable && reportData.isRiskyRating,
      icon: SearchCheck,
    },
    {
      title: "Price Analysis",
      description: reportData.isPriceOutlier
        ? "This product's price deviates abnormally from market average. There may be a risk of counterfeit product."
        : "Product price appears consistent with market average.",
      isRisky: reportData.isPriceOutlier,
      icon: DollarSign,
    },
    {
      title: "Seller Reliability",
      description: reportData.isRiskySeller
        ? "This seller has a low reliability score. There may have been counterfeit product sales detected in the past."
        : "Seller appears trustworthy, no issues detected in past records.",
      isRisky: reportData.isRiskySeller,
      icon: CircleUserRound,
    },
  ] as const;

  const hasRiskyReport = reportDetails.some((detail) => detail.isRisky);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Product Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="report">
              {hasRiskyReport && (
                <AlertTriangle className="h-4 w-4 mr-2 text-destructive" />
              )}{" "}
              Report Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold mb-2">Product Description</h3>
              <div className="text-sm text-muted-foreground whitespace-pre-line">
                {productDescription}
              </div>
            </div>

            {/* Product Specifications - Mock data */}
            <div>
              <h3 className="font-semibold mb-2">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-sm text-muted-foreground">
                      Model Number
                    </span>
                    <span className="text-sm font-medium">-</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-sm text-muted-foreground">
                      Weight
                    </span>
                    <span className="text-sm font-medium">-</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-sm text-muted-foreground">
                      Battery Life
                    </span>
                    <span className="text-sm font-medium">-</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-sm text-muted-foreground">
                      Connectivity
                    </span>
                    <span className="text-sm font-medium">-</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-sm text-muted-foreground">
                      Driver Size
                    </span>
                    <span className="text-sm font-medium">-</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-sm text-muted-foreground">Color</span>
                    <span className="text-sm font-medium">-</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="report" className="space-y-6 mt-4">
            {/* Additional Report Details */}
            <div>
              <div className="mb-3 space-y-1">
                <h3 className="font-semibold">
                  <AppLogo withoutText className="inline-block w-6 h-6 mr-1" />{" "}
                  AI Analysis
                </h3>
                <p className="text-sm text-muted-foreground">
                  We have analyzed this product. Here are the results:
                </p>
              </div>
              <div className="space-y-3">
                {reportDetails.map((detail) => {
                  const IconComponent = detail.isRisky
                    ? AlertTriangle
                    : detail.icon;
                  return (
                    <Alert
                      key={detail.title}
                      variant={detail.isRisky ? "destructive" : "default"}
                    >
                      <IconComponent
                        className={`h-4 w-4 ${
                          detail.isRisky ? "text-destructive" : "text-primary"
                        }`}
                      />
                      <AlertTitle>{detail.title}</AlertTitle>
                      <AlertDescription>
                        {detail.description
                          ? detail.description
                          : "Şüpheli bir durum tespit edilmedi."}
                      </AlertDescription>
                    </Alert>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
