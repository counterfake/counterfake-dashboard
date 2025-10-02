"use client";

import React from "react";
import {
  Store,
  Calendar,
  Building2,
  ShoppingCart,
  ExternalLink,
  MessageCircleWarning,
  ShoppingBag,
  FileText,
  Package,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/primitives/card";
import { Badge } from "@/common/components/ui/primitives/badge";
import { Button } from "@/common/components/ui/primitives/button";
import { Skeleton } from "@/common/components/ui/primitives/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/common/components/ui/primitives/tooltip";
import { ROUTES } from "@/common/lib/config/routes";

import { Product } from "../../types/products.types";

interface ProductInfoCardProps {
  product: Product & {
    category: string;
  };
  isLoading?: boolean;
}

export function ProductInfoCard({
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
        <div className="flex-1 space-y-2">
          {product?.name ? (
            <CardTitle className="text-2xl">{product?.name}</CardTitle>
          ) : (
            <CardTitle className="text-2xl opacity-70">No Title</CardTitle>
          )}
          <div className="flex items-center gap-2">
            {product?.ad?.discountedPrice && product?.ad?.originalPrice && (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  {product?.ad?.discountedPrice} {product?.ad?.currency}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {product?.ad?.originalPrice} {product?.ad?.currency}
                </span>
                <Badge variant="outline">
                  {product?.ad?.discountPercentage}% Discount
                </Badge>
              </div>
            )}
            {product?.ad?.originalPrice && (
              <span className="text-xl font-semibold text-primary">
                {product?.ad?.originalPrice} {product?.ad?.currency}
              </span>
            )}
            {!product?.ad?.originalPrice && !product?.ad?.discountedPrice && (
              <span className="text-xl font-semibold text-primary opacity-60">
                No Price
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            This product was listed{" "}
            <span className="text-primary font-semibold">
              {product?.analysis?.daysSinceListed} days ago.
            </span>{" "}
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-5">
        {/* Seller Information */}
        <div className="flex items-center gap-3">
          <Store className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Seller</p>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={
                      ROUTES.USER_DASHBOARD_SELLERS + "/" + product?.profile?.id
                    }
                    className="font-medium text-primary flex items-center gap-1.5 truncate"
                  >
                    {product?.seller?.avatarUrl && (
                      <div className="overflow-hidden rounded-full flex-shrink-0">
                        <Image
                          src={product?.seller?.avatarUrl}
                          alt={product?.seller?.name}
                          width={20}
                          height={20}
                          className="h-5 w-5 object-cover"
                        />
                      </div>
                    )}
                    {product?.seller?.name}
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="font-medium">
                  View{" "}
                  <span className="text-primary">{product?.seller?.name}</span>{" "}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Brand</p>
            <p className="font-medium">{product?.brand?.name}</p>
          </div>
        </div>

        {/* Category */}
        <div className="flex items-center gap-3">
          <Package className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="font-medium">{product?.category}</p>
          </div>
        </div>

        {/* Platform */}
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Platform</p>
            <p className="flex items-center gap-1.5 font-medium">
              {product?.platform?.iconLink && (
                <span className="inline-block overflow-hidden rounded-full">
                  <Image
                    src={product?.platform?.iconLink}
                    alt={product?.platform?.name}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-cover"
                  />
                </span>
              )}
              {product?.platform?.name}
            </p>
          </div>
        </div>

        {/* Listed Date */}
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Listed Date</p>
            <p className="font-medium">{product?.analysis?.listedAt || "-"}</p>
          </div>
        </div>

        {/* Reported Date */}
        <div className="flex items-center gap-3">
          <MessageCircleWarning className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Reported Date</p>
            <p className="font-medium">
              {product?.analysis?.reportedAt || "-"}
            </p>
          </div>
        </div>

        {/* Product Description */}
        {product?.ad?.description && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Seller entered this description:
              </p>
            </div>
            <div className="text-sm leading-relaxed whitespace-pre-line text-foreground font-medium">
              &quot;{product.ad.description}&quot;
            </div>
          </div>
        )}

        <div className="space-y-3">
          {/* View Listing Button */}
          <Button
            className="w-full"
            onClick={() =>
              product?.ad?.url && window.open(product?.ad?.url, "_blank")
            }
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            View Original Listing
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
