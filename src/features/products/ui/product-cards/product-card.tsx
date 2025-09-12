import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  ArrowRight,
  Info,
  MessageCircleWarning,
} from "lucide-react";
import { PiStarFourFill } from "react-icons/pi";

import { cn } from "@/common/lib/utils/ui";

import {
  CardContent,
  CardFooter,
  CardHeader,
} from "@/common/components/ui/primitives/card";
import { Button } from "@/common/components/ui/primitives/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/common/components/ui/primitives/tooltip";

import { PreventClick } from "@/common/components/utility/prevent-click";

import { SelectableCard } from "@/common/components/ui/data-display/selectable-card";
import { Badge } from "@/common/components/ui/primitives/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/common/components/ui/primitives/hover-card";
import { TextReveal } from "@/common/components/ui/animation/text-reveal";

import { Product } from "../../types/products.types";

export interface ProductCardProps {
  product: Product;
  className?: string;
  selectable?: boolean;
  selected?: boolean;
  onSelectChange?: (selected: boolean) => void;
}

export function ProductCard({
  product,
  className,
  selectable = false,
  selected = false,
  onSelectChange,
}: ProductCardProps) {
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
            src={product.coverImage}
            alt={product.name}
            fill
            className="object-cover"
          />

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.analysis?.analysisSummaryText && (
              <HoverCard openDelay={100} closeDelay={0}>
                <HoverCardTrigger asChild>
                  <div>
                    <div className="w-7 h-7 flex items-center justify-center p-0 bg-muted text-primary border border-accent-foreground/40 shadow rounded-full hover:animate-spin hover:duration-[3s] cursor-default">
                      <PiStarFourFill className="w-3 h-3" />
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent
                  side="top"
                  className="bg-gradient-to-br from-white via-muted to-white"
                >
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <PiStarFourFill
                        className={cn(
                          "w-5 h-5 animate-spin duration-[3s] inline-block",
                          product.analysis?.analysisSummaryText
                            ? "text-primary"
                            : "opacity-50"
                        )}
                      />
                      AI Analysis Summary
                    </h4>
                    <div className="flex items-start gap-2">
                      <TextReveal
                        text={
                          product.analysis?.analysisSummaryText ||
                          "Analysis summary not available."
                        }
                        duration={0.01}
                        delay={0.2}
                        as="p"
                        className={cn(
                          "text-base font-medium whitespace-pre-wrap break-words text-muted-foreground"
                        )}
                        convertSpacesToNbsp={false}
                        triggerOnView
                      />
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Product Info */}
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-medium">
              {product?.platform?.name || "No Platform"}
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="font-semibold text-lg line-clamp-2"
                  href={`/dashboard/products/${product.id}`}
                >
                  {product?.name || (
                    <span className="text-muted-foreground">No Title</span>
                  )}
                </Link>
              </TooltipTrigger>
              {product?.name && (
                <TooltipContent>{product?.name}</TooltipContent>
              )}
            </Tooltip>

            {product?.analysis?.reportReasons.length > 0 && (
              <HoverCard openDelay={400} closeDelay={200}>
                <HoverCardTrigger asChild>
                  <div className="w-full bg-muted-foreground/5 text-accent-foreground flex justify-center items-center gap-2 px-4 py-1 mt-2 text-xs font-medium rounded cursor-default">
                    <MessageCircleWarning className="w-3 h-3" />
                    Report Reasons
                  </div>
                </HoverCardTrigger>
                <HoverCardContent side="left">
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      Report Reasons
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      This product has been reported for the following reasons:
                    </p>
                    <div className="flex items-start gap-2 mt-3">
                      {product.analysis.reportReasons.map((reason, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          size="lg"
                          className="px-2 py-0.5 bg-amber-50 border-amber-200 text-amber-700"
                        >
                          {reason}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>

          {/* Additional Info */}
          <div>
            <div className="flex items-center justify-between gap-2 text-sm border-b py-2">
              <span className="text-muted-foreground flex-shrink-0">Price</span>
              {product?.ad?.originalPrice ? (
                <span className="font-medium hover:underline">
                  {product?.ad?.discountedPrice && (
                    <span className="text-success mr-1">
                      {product?.ad?.discountedPrice}
                    </span>
                  )}
                  <span
                    className={
                      product?.ad?.discountedPrice
                        ? "text-xs line-through text-muted-foreground"
                        : ""
                    }
                  >
                    {product?.ad?.originalPrice}
                  </span>{" "}
                  <span>{product?.ad?.currency}</span>
                </span>
              ) : (
                <span className="text-muted-foreground font-medium hover:underline">
                  No Price
                </span>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 text-sm border-b py-2">
              <span className="text-muted-foreground flex-shrink-0">
                Seller
              </span>
              <Link
                href={product?.seller?.url}
                className="text-primary font-medium hover:underline"
              >
                {product?.seller?.name}
              </Link>
            </div>
            <div className="flex items-center justify-between gap-2 text-sm border-b py-2">
              <span className="text-muted-foreground flex-shrink-0">
                Reported
              </span>
              <span className="font-medium hover:underline">
                {product?.analysis?.daysSinceReported
                  ? `${product?.analysis?.daysSinceReported} days ago`
                  : "-"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 text-sm border-b py-2">
              <span className="text-muted-foreground flex-shrink-0">
                Status
              </span>
              <span>
                <Badge
                  variant={
                    product?.analysis?.isRisky ? "destructiveSoft" : "default"
                  }
                >
                  {product?.analysis?.status}
                </Badge>
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            <Info className="w-3 h-3 inline-block mr-1" />
            Listed{" "}
            <span className="font-medium text-primary">
              {product?.analysis?.daysSinceListed} days ago
            </span>
          </p>
        </div>
      </CardContent>

      <CardFooter className="block p-4 pt-0 space-y-4 mt-auto">
        <PreventClick className="flex space-x-2 pt-2">
          <Button variant="soft" size="sm" className="flex-1" asChild>
            <Link href={`/dashboard/products/${product.id}`}>
              <ArrowRight className="w-4 h-4 mr-2" />
              Details
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={product.ad.url || "#"} target="_blank">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit
            </Link>
          </Button>
        </PreventClick>
      </CardFooter>
    </SelectableCard>
  );
}
