import { Fragment } from "react";

import { cn } from "@/common/lib/utils/ui";

import { Product } from "../../../types/products.types";

import { DefaultBrandProductCard } from "../../product-cards/default-brand-product-card";
import { CompactBrandProductCard } from "../../product-cards/compact-brand-product-card";
import { MinimalBrandProductCard } from "../../product-cards/minimal-brand-product-card";

import { ProductGridSkeleton } from "./product-grid-skeleton";
import { ProductGridError } from "./product-grid-error";
import { ProductGridEmpty } from "./product-grid-empty";

interface ProductsGridProps {
  products: Product[];
  layout: "default" | "compact" | "minimal";
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  className?: string;
}

const layoutClasses = {
  default: "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  compact: "grid-cols-2",
  minimal: "grid-cols-2",
} as const;

export function ProductGrid({
  products,
  layout,
  isLoading,
  isError,
  isEmpty,
  className,
}: ProductsGridProps) {
  if (isLoading) return <ProductGridSkeleton />;

  if (isError) return <ProductGridError />;

  if (isEmpty) return <ProductGridEmpty />;

  return (
    <div className={cn("grid gap-6", layoutClasses[layout], className)}>
      {products.map((product) => {
        return (
          <Fragment key={product.id}>
            {layout === "default" && (
              <DefaultBrandProductCard
                product={{
                  name: product.name,
                  price: product.price,
                  discountedPrice: product.discountedPrice,
                  imageUrl: product.coverImage,
                  platform: product.platformName,
                  sellerName: product.sellerName,
                  sellerUrl: product.sellerUrl,
                  reasons: product.reasons,
                  brand: product.brandName,
                  visitButtonHref: product.url,
                  detailsButtonHref: product.url,
                  titleHref: product.url,
                  isRisky: product?.isRisky,
                }}
              />
            )}
            {layout === "compact" && (
              <CompactBrandProductCard
                product={{
                  name: product.name,
                  price: product.price,
                  discountedPrice: product.discountedPrice,
                  imageUrl: product.coverImage,
                  platform: product.platformName,
                  sellerName: product.sellerName,
                  sellerUrl: product.sellerUrl,
                  reasons: product.reasons,
                  viewDetailsHref: product.url,
                  isRisky: product.isRisky,
                }}
              />
            )}
            {layout === "minimal" && (
              <MinimalBrandProductCard
                product={{
                  name: product.name,
                  price: product.price,
                  discountedPrice: product.discountedPrice,
                  imageUrl: product.coverImage,
                  platform: product.platformName,
                }}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
