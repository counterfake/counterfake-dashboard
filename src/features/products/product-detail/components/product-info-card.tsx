"use client";

import React from "react";
import { format } from "date-fns";
import {
  Store,
  Calendar,
  AlertTriangle,
  Package,
  Building2,
  ShoppingCart,
  ExternalLink,
  BadgeCheck,
  MessageCircleWarning,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { Badge } from "@/components/ui/primitives/badge";
import { Button } from "@/components/ui/primitives/button";
import { Skeleton } from "@/components/ui/primitives/skeleton";

interface ProductInfoCardProps {
  product: {
    name: string;
    images: string[];
    seller: {
      name: string;
      id: string;
      isVerified: boolean;
      isRisky: boolean;
    } | null;
    listedDate: string;
    reportedDate: string;
    category: string;
    brand: string | null;
    platform: string | null;
    description: string | null;
    listingUrl: string | null;
    rating: number | null;
    price: string | null;
    discountedPrice: string | null;
    discountPercentage: number | null;
    status: string | null;
    statusCategory: string | null;
  };
  isLoading?: boolean;
}

export default function ProductInfoCard({
  product,
  isLoading = false,
}: ProductInfoCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
          <Skeleton className="h-10 w-full mt-4" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl">{product.name}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              {product.statusCategory && (
                <Badge variant="outline">{product.statusCategory}</Badge>
              )}

              {product.discountedPrice && product.price && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {product.discountedPrice}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {product.price}
                  </span>
                  <Badge variant="outline">
                    {product.discountPercentage}% Discount
                  </Badge>
                </div>
              )}
              {!product.discountedPrice && product.price && (
                <span className="text-xl font-semibold text-primary">
                  {product.price}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Seller Information */}
        <div className="flex items-center gap-3">
          <Store className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Seller</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">{product.seller?.name}</p>
              {product.seller?.isVerified && (
                <Badge variant="info" className="text-xs">
                  <BadgeCheck className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="flex items-center gap-3">
          <Package className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="font-medium">{product.category}</p>
          </div>
        </div>

        {/* Brand */}
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Brand</p>
            <p className="font-medium">{product.brand}</p>
          </div>
        </div>

        {/* Platform */}
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Platform</p>
            <p className="font-medium">{product.platform}</p>
          </div>
        </div>

        {/* Listed Date */}
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Listed Date</p>
            <p className="font-medium">
              {product.listedDate
                ? format(new Date(product.listedDate), "PPP")
                : "-"}
            </p>
          </div>
        </div>

        {/* Reported Date */}
        <div className="flex items-center gap-3">
          <MessageCircleWarning className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Reported Date</p>
            <p className="font-medium">
              {product.reportedDate
                ? format(new Date(product.reportedDate), "PPP")
                : "-"}
            </p>
          </div>
        </div>

        {/* Report Status */}
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Report Reason</p>
            <p className="font-medium">{product.status || "-"}</p>
          </div>
        </div>

        {/* View Listing Button */}
        <Button
          className="w-full"
          onClick={() =>
            product?.listingUrl && window.open(product.listingUrl, "_blank")
          }
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Original Listing
        </Button>
      </CardContent>
    </Card>
  );
}
