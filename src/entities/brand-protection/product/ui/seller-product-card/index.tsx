import React from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink, Package } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/common/components/ui/primitives/card";
import { Badge } from "@/common/components/ui/primitives/badge";
import { Button } from "@/common/components/ui/primitives/button";

import { Product } from "../../model/types";
import { productService } from "../../model";
import Link from "next/link";
import { PAGE_ROUTES } from "@/shared/routes/page-routes";

interface SellerProductCardProps {
  product: Product;
}

export function SellerProductCard({ product }: SellerProductCardProps) {
  const statusInfo = productService.getStatusLabel(product.status);
  const firstImage = product.images?.[0];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2">
        <div className="flex gap-3">
          {/* Product Image */}
          <div className="w-20 h-20 rounded-lg border bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
            {firstImage ? (
              <Image
                src={firstImage}
                alt={product.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="w-8 h-8 text-muted-foreground" />
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h5 className="font-semibold text-sm line-clamp-2 mb-1">
              {product.name}
            </h5>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {product.brandName && (
                <Badge variant="primarySoft" size="default">
                  {product.brandName}
                </Badge>
              )}
              <Badge variant={statusInfo.variant} size="default">
                {statusInfo.label}
              </Badge>
            </div>
            {product?.pricing?.originalPrice ? (
              <span className="text-sm font-semibold">
                {product?.pricing?.discountedPrice && (
                  <span className="text-success mr-1">
                    {product?.pricing?.discountedPrice}
                  </span>
                )}
                <span
                  className={
                    product?.pricing?.discountedPrice
                      ? "text-xs line-through text-muted-foreground"
                      : ""
                  }
                >
                  {product?.pricing?.originalPrice}
                </span>{" "}
                <span>{product?.pricing?.currency}</span>
              </span>
            ) : (
              <span className="text-muted-foreground font-medium hover:underline">
                No Price
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 p-4 pt-2">
        <Button asChild variant="soft" size="sm" className="w-full">
          <Link
            href={`${PAGE_ROUTES.USER_DASHBOARD_PRODUCTS}/${product.id}`}
            className="inline-flex items-center gap-2"
          >
            <ArrowRight className="w-3 h-3" />
            View Product
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="w-full">
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            <ExternalLink className="w-3 h-3" />
            View on Platform
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
