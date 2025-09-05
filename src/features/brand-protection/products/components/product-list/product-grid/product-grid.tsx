import { Fragment } from "react";

import { cn } from "@/common/lib/utils/ui";

import { DefaultBrandProductCard } from "../../product-cards/default-brand-product-card";
import { CompactBrandProductCard } from "../../product-cards/compact-brand-product-card";
import { MinimalBrandProductCard } from "../../product-cards/minimal-brand-product-card";

import ProductGridSkeleton from "./product-grid-skeleton";
import ProductGridError from "./product-grid-error";
import ProductGridEmpty from "./product-grid-empty";

interface ProductItem {
  id: number;
  name: string;
  price: string;
  discountedPrice?: string;
  imageUrl: string;
  platform: string;
  sellerName: string;
  sellerUrl: string;
  rating: number;
  reasons: string[];
  brand: string;
  visitButtonHref: string;
  detailsButtonHref: string;
  titleHref: string;
  isRisky: boolean;
}

interface ProductsGridProps {
  products: ProductItem[];
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

export default function ProductGrid({
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
                  imageUrl: product.imageUrl,
                  platform: product.platform,
                  sellerName: product.sellerName,
                  sellerUrl: product.sellerUrl,
                  rating: product.rating,
                  reasons: product.reasons,
                  brand: product.brand,
                  visitButtonHref: product.visitButtonHref,
                  detailsButtonHref: product.detailsButtonHref,
                  titleHref: product.titleHref,
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
                  imageUrl: product.imageUrl,
                  platform: product.platform,
                  sellerName: product.sellerName,
                  sellerUrl: product.sellerUrl,
                  reasons: product.reasons,
                  viewDetailsHref: product.visitButtonHref,
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
                  imageUrl: product.imageUrl,
                  platform: product.platform,
                }}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
