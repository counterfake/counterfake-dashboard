import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Package, ExternalLink, ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/common/components/ui/primitives/card";
import { Button } from "@/common/components/ui/primitives/button";

import {
  ProductCase,
  ProductCaseStatus,
} from "@/entities/brand-protection/case";

import { PAGE_ROUTES } from "@/shared/routes/page-routes";
import { getCaseStatusInfo } from "../config";
import { Badge } from "@/common/components/ui/primitives/badge";

interface CaseProductCardProps {
  product: ProductCase["products"]["items"][0];
  status: ProductCaseStatus;
}

export function CaseProductCard({ product, status }: CaseProductCardProps) {
  const statusInfo = getCaseStatusInfo(status);
  const StatusIcon = statusInfo.icon;

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardHeader className="p-4 pb-3">
        <div className="flex gap-5">
          <div className="w-20 h-20 rounded-lg border bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0 space-y-3">
            <div className="space-y-1">
              <h5 className="font-semibold text-sm line-clamp-2 leading-tight">
                {product.name || (
                  <span className="text-muted-foreground italic">
                    Product name not available
                  </span>
                )}
              </h5>
              <Badge variant={statusInfo.variant} size="sm" className="gap-1">
                <StatusIcon className="w-3 h-3" />
                {statusInfo.label}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 w-full border-b pb-2 text-xs">
                <span>Price:</span>
                {product.pricing?.originalPrice ? (
                  <div className="font-medium">
                    {product.pricing.originalPrice} {product.pricing.currency}
                  </div>
                ) : (
                  <span className="text-muted-foreground italic">
                    No price
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-2 w-full border-b pb-2 text-xs">
                <span>Brand:</span>
                {product.brandName ? (
                  <div className="font-medium">{product.brandName}</div>
                ) : (
                  <span className="text-muted-foreground italic">
                    Brand not specified
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-2 w-full pb-2 text-xs">
                <span>Seller:</span>
                {product.sellerName ? (
                  <div className="font-medium">{product.sellerName}</div>
                ) : (
                  <span className="text-muted-foreground italic">
                    Seller not specified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-3">
        {/* View Product Button */}
        <Button asChild variant="soft" size="sm" className="w-full">
          <Link
            href={`${PAGE_ROUTES.USER_DASHBOARD_PRODUCTS}/${product.id}`}
            className="inline-flex items-center gap-2"
          >
            View Product
            <ArrowRight className="w-3 h-3" />
          </Link>
        </Button>
        {product.url ? (
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
        ) : (
          <Button variant="outline" size="sm" className="w-full" disabled>
            <ExternalLink className="w-3 h-3" />
            Platform link not available
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
