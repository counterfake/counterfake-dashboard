"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, AlertTriangle } from "lucide-react";

import {
  CardContent,
  CardFooter,
  CardHeader,
} from "@/common/components/ui/primitives/card";
import { Badge } from "@/common/components/ui/primitives/badge";
import { Button } from "@/common/components/ui/primitives/button";
import { PreventClick } from "@/common/components/utility/prevent-click";

import { SelectableCard } from "@/common/components/ui/data-display/selectable-card";

export interface CompactBrandProductCardProps {
  product: {
    name: string;
    price?: string | number;
    discountedPrice?: string | number;
    imageUrl: string;
    platform: string;
    sellerName: string;
    sellerUrl: string;
    reasons: string[];
    viewDetailsHref: string;
    isRisky?: boolean;
  };
  className?: string;
  selectable?: boolean;
  selected?: boolean;
  onSelectChange?: (selected: boolean) => void;
}

export function CompactBrandProductCard({
  product,
  className,
  selectable = false,
  selected = false,
  onSelectChange,
}: CompactBrandProductCardProps) {
  return (
    <SelectableCard
      selectable={selectable}
      selected={selected}
      onSelectChange={onSelectChange}
      className={className}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <h3 className="font-semibold text-base line-clamp-1">
                {product.name || (
                  <span className="text-muted-foreground">
                    Name not available
                  </span>
                )}
              </h3>
              <p className="text-sm text-muted-foreground">
                {product.platform}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {product.discountedPrice ? (
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-green-600">
                    {product.discountedPrice}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    {product.price}
                  </span>
                </div>
              ) : (
                <span className="text-base font-semibold">{product.price}</span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Seller:</span>
            <Link
              href={product.sellerUrl || "#"}
              className="text-primary hover:underline truncate max-w-[120px]"
            >
              {product.sellerName}
            </Link>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Reasons:</span>
            <span className="text-muted-foreground text-xs">
              {product.reasons.length > 0
                ? product.reasons.join(", ")
                : "No reasons"}
            </span>
          </div>
          {product.isRisky && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant="destructive">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Risky
              </Badge>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <PreventClick asChild>
          <Button size="sm" className="w-full cursor-pointer" asChild>
            <Link href={`${product.viewDetailsHref}`}>
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Link>
          </Button>
        </PreventClick>
      </CardFooter>
    </SelectableCard>
  );
}
