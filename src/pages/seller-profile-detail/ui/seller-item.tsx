import React, { useState } from "react";
import {
  ExternalLink,
  Star,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { Badge } from "@/common/components/ui/primitives/badge";
import { Separator } from "@/common/components/ui/primitives/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/ui/primitives/avatar";
import { Button } from "@/common/components/ui/primitives/button";
import { SellerProfile } from "@/entities/brand-protection/seller-profile/model/types";
import { SellerProductCard } from "@/entities/brand-protection/product/ui/seller-product-card";
import { productQueries } from "@/entities/brand-protection/product/query";
import { useAuthStore } from "@/common/lib/stores/auth-store";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/common/components/ui/primitives/tooltip";
import { Pagination } from "@/common/components/ui/navigation/pagination";

interface SellerItemProps {
  seller: SellerProfile["sellers"][number];
  showSeparator: boolean;
}

export function SellerItem({ seller, showSeparator }: SellerItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuthStore();

  const ITEMS_PER_PAGE = 10;

  // Only fetch products when expanded
  const { data: productsData, isLoading } = useQuery({
    ...productQueries.list({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      brandId: user?.brand?.id,
      sellerId: seller.id,
    }),
    enabled: isExpanded && !!user?.brand?.id,
  });

  const products = productsData?.products || [];
  const totalPages = productsData?.pages || 1;
  const totalCount = productsData?.count || 0;

  return (
    <div>
      {showSeparator && <Separator className="my-4" />}

      {/* Seller Info */}
      <div className="flex items-start gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={seller.avatarUrl} alt={seller.name} />
          <AvatarFallback>
            {seller.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0 space-y-1">
              <h4 className="font-semibold text-base truncate">
                {seller.name}
              </h4>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 py-1 px-3 rounded-full border bg-card">
                  {seller.platform.iconLink && (
                    <Image
                      src={seller.platform.iconLink}
                      alt={seller.platform.name}
                      width={32}
                      height={32}
                      className="w-5 h-5 object-contain"
                    />
                  )}
                  <span className="text-xs font-medium truncate">
                    {seller.platform.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {seller.isClosed && (
                <Badge variant="destructiveSoft" size="default">
                  This Seller is Closed
                </Badge>
              )}
              {seller.url && (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={seller.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary inline-flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit on
                    <span className="font-semibold">
                      {seller.platform.name}
                    </span>
                  </a>
                </Button>
              )}

              {/* Expand/Collapse Button */}
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={5}>
                  View Seller Products
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section - Collapsible */}
      {isExpanded && (
        <div className="mt-4 pl-16">
          <div className="mb-3">
            <h5 className="text-sm font-semibold text-muted-foreground">
              Seller Products
              {!isLoading && ` (${totalCount})`}
            </h5>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {products.map((product) => (
                  <SellerProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  showInfo
                  totalItems={totalCount}
                  itemsPerPage={ITEMS_PER_PAGE}
                />
              )}
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No products found for this seller
            </div>
          )}
        </div>
      )}
    </div>
  );
}
