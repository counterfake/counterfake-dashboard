import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ExternalLink, AlertTriangle } from "lucide-react";

import {
  CardContent,
  CardFooter,
  CardHeader,
} from "@/common/components/ui/primitives/card";
import { Badge } from "@/common/components/ui/primitives/badge";
import { Button } from "@/common/components/ui/primitives/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/common/components/ui/primitives/tooltip";

import { PreventClick } from "@/common/components/utility/prevent-click";

import Rating from "@/common/components/ui/data-display/rating";

import { SelectableCard } from "@/common/components/ui/data-display/selectable-card";

export interface DefaultBrandProductCardProps {
  product: {
    name: string;
    price?: string | number;
    discountedPrice?: string | number;
    imageUrl: string;
    platform: string;
    sellerName: string;
    sellerUrl: string;
    rating?: number;
    reasons: string[];
    brand: string;
    visitButtonHref: string;
    detailsButtonHref: string;
    titleHref?: string;
    isRisky?: boolean;
  };
  className?: string;
  selectable?: boolean;
  selected?: boolean;
  onSelectChange?: (selected: boolean) => void;
}

export function DefaultBrandProductCard({
  product,
  className,
  selectable = false,
  selected = false,
  onSelectChange,
}: DefaultBrandProductCardProps) {
  return (
    <SelectableCard
      selectable={selectable}
      selected={selected}
      onSelectChange={onSelectChange}
      className={className}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.isRisky && (
            <div className="absolute top-3 right-3">
              <Badge variant="destructive">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Risky
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Product Info */}
        <div className="space-y-2">
          <div>
            <p className="text-sm">{product.brand || "-"}</p>
            <Tooltip>
              <TooltipTrigger asChild>
                <h3 className="font-semibold text-lg line-clamp-1">
                  {product.titleHref ? (
                    <Link href={product.titleHref}>
                      {product.name || (
                        <span className="text-muted-foreground">
                          Name not available
                        </span>
                      )}
                    </Link>
                  ) : (
                    product.name || (
                      <span className="text-muted-foreground">
                        Name not available
                      </span>
                    )
                  )}
                </h3>
              </TooltipTrigger>
              {product.name && <TooltipContent>{product.name}</TooltipContent>}
            </Tooltip>
            <Tooltip delayDuration={350}>
              <TooltipTrigger asChild>
                <PreventClick asChild>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    <Link
                      href={product.sellerUrl}
                      className="text-primary font-medium hover:underline"
                    >
                      {product.sellerName}
                    </Link>{" "}
                    on {product.platform}
                  </p>
                </PreventClick>
              </TooltipTrigger>
              <TooltipContent>
                {product.sellerName}
                <span className="text-primary"> on {product.platform}</span>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              {product.discountedPrice ? (
                <>
                  <div className="text-xl font-semibold text-success">
                    {product.discountedPrice}
                  </div>
                  <div className="text-sm text-muted-foreground line-through">
                    {product.price}
                  </div>
                </>
              ) : (
                <div className="text-xl font-semibold">{product.price}</div>
              )}
            </div>
            <Rating rating={product.rating} size="sm" />
          </div>

          {/* Additional Info */}
          <p className="text-xs text-muted-foreground">
            {product.reasons.length > 0 ? (
              <>
                Listed due to{" "}
                <span className="font-medium text-primary">
                  {product.reasons.join(", ")}
                </span>
              </>
            ) : (
              "No reasons"
            )}
          </p>
        </div>
      </CardContent>

      <CardFooter className="block p-4 pt-0 space-y-4 mt-auto">
        <PreventClick className="flex space-x-2 pt-2">
          <Button variant="soft" size="sm" className="flex-1" asChild>
            <Link href={product.detailsButtonHref || "#"}>
              <Eye className="w-4 h-4 mr-2" />
              Details
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={product.visitButtonHref || "#"} target="_blank">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit
            </Link>
          </Button>
        </PreventClick>
      </CardFooter>
    </SelectableCard>
  );
}
