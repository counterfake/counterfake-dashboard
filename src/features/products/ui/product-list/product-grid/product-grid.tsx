import { Fragment } from "react";

import { cn } from "@/common/lib/utils/ui";

import { Product } from "../../../types/products.types";

import { ProductGridSkeleton } from "./product-grid-skeleton";
import { ProductGridError } from "./product-grid-error";
import { ProductGridEmpty } from "./product-grid-empty";
import { ProductCard } from "../../product-cards/product-card";

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  className?: string;
}

export function ProductGrid({
  products,
  isLoading,
  isError,
  isEmpty,
  className,
}: ProductsGridProps) {
  if (isLoading) return <ProductGridSkeleton />;

  if (isError) return <ProductGridError />;

  if (isEmpty) return <ProductGridEmpty />;

  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {products.map((product) => {
        return (
          <Fragment key={product.id}>
            <ProductCard product={product} />
          </Fragment>
        );
      })}
    </div>
  );
}
