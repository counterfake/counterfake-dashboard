import React, { useState } from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/common/components/ui/primitives/card";
import { Badge } from "@/common/components/ui/primitives/badge";
import { Button } from "@/common/components/ui/primitives/button";
import { Separator } from "@/common/components/ui/primitives/separator";
import { Pagination } from "@/common/components/ui/navigation/pagination";

import { ProductCaseListItem } from "@/entities/brand-protection/case";
import { getCaseStatusInfo } from "../config";
import { useProductCaseProducts } from "../model";
import { CaseProductCard } from "./case-product-card";

interface CaseCardProps {
  productCase: ProductCaseListItem;
}

export function CaseCard({ productCase }: CaseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  const statusInfo = getCaseStatusInfo(productCase.status);
  const StatusIcon = statusInfo.icon;

  // Only fetch products when expanded
  const { products, isLoading } = useProductCaseProducts(productCase.id, {
    productsPage: currentPage,
    productsLimit: ITEMS_PER_PAGE,
    enabled: isExpanded,
  });

  const totalPages = products?.pages || 1;
  const totalCount = products?.total || 0;
  const productItems = products?.items || [];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 flex items-center gap-3">
            <CardTitle className="text-lg">
              {productCase.platformName}
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={statusInfo.variant} className="gap-1">
                <StatusIcon className="w-3 h-3" />
                {statusInfo.label}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription>
          <span className="font-semibold">
            {productCase.reportCount} reports
          </span>{" "}
          have been received on{" "}
          <span className="font-semibold">{productCase.platformName}</span>{" "}
          platform.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground text-xs mb-1">
              Included Brands
            </p>
            <div className="flex gap-1 flex-wrap">
              {productCase.brands.map((brand, idx) => (
                <Badge key={idx} variant="primarySoft">
                  {brand}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-1">Sender</p>
            <p className="font-medium truncate">{productCase.sender}</p>
          </div>
        </div>

        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="default"
          className="w-full"
          size="sm"
        >
          {isExpanded ? (
            <>
              Hide Products
              <ChevronUp className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              View Products ( {productCase.reportCount} )
              <ChevronDown className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>

        {/* Products Section - Collapsible */}
        {isExpanded && (
          <>
            <Separator />
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-semibold text-muted-foreground">
                  Reported Products
                  {!isLoading && totalCount > 0 && ` (${totalCount})`}
                </h5>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : productItems.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {productItems.map((product) => (
                      <CaseProductCard
                        key={product.id}
                        product={product}
                        status={productCase.status}
                      />
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
                  No products found for this case
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
