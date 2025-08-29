import React from "react";

import ProductsGrid from "../product-grid";
import ProductSkeletonGrid from "../product-skeleton-grid";
import ProductErrorAlert from "../product-error-alert";
import ProductNoData from "../product-no-data";

interface ProductListSectionProps {
  isLoading: boolean;
  isError: boolean;
  products: any[];
  layout: "default" | "compact" | "minimal";
}

export default function ProductListSection({
  isLoading,
  isError,
  products,
  layout,
}: ProductListSectionProps) {
  if (isLoading) return <ProductSkeletonGrid />;

  if (isError) return <ProductErrorAlert />;

  if (products.length === 0) return <ProductNoData />;

  return (
    <div id="products-grid">
      <ProductsGrid products={products} layout={layout} />
    </div>
  );
}
