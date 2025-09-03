import { Fragment } from "react";

import { UserConfigState } from "@/common/lib/stores/user-config-store";

import { ROUTES } from "@/common/lib/config/routes";

import { cn } from "@/common/lib/utils/ui";
import { absoluteImageUrl } from "@/common/lib/utils/absolute-image-url";

import { type Product } from "@/common/types/brand-protection/product";

import { DefaultBrandProductCard } from "@/common/components/ui/data-display/cards/default-brand-product-card";
import { CompactBrandProductCard } from "@/common/components/ui/data-display/cards/compact-brand-product-card";
import { MinimalBrandProductCard } from "@/common/components/ui/data-display/cards/minimal-brand-product-card";
import { convertRatingTo5Based } from "@/common/lib/utils/convert-rating-5-based";

interface ProductsGridProps {
  products: Product[];
  layout: UserConfigState["productGridLayout"];
}

const layoutClasses = {
  default: "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  compact: "grid-cols-2",
  minimal: "grid-cols-2",
} as const;

export default function ProductsGrid({ products, layout }: ProductsGridProps) {
  return (
    <div className={cn("grid gap-6", layoutClasses[layout])}>
      {products.map((product) => {
        const discountedPrice =
          product?._price_discountedPrice !== -1 &&
          typeof product?._price_discountedPrice === "number"
            ? `${product?._price_discountedPrice} ${product?.currency}`
            : undefined;
        const price =
          product.price_actualPrice !== -1
            ? `${product?.price_actualPrice} ${product?.currency}`
            : "N/A";

        return (
          <Fragment key={product.id}>
            {layout === "default" && (
              <DefaultBrandProductCard
                product={{
                  name: product?.title_text,
                  price,
                  discountedPrice,
                  imageUrl: absoluteImageUrl(product?.images?.[0]?.path),
                  platform: product?.platform?.name,
                  seller: product?.seller?.profile?.universal_name,
                  sellerUrl: `${ROUTES.USER_DASHBOARD_SELLERS}/${product?.seller?.profile?.id}`,
                  rating: convertRatingTo5Based(product?.rating) ?? 0,
                  fakeScore: Number(product?.fake_score),
                  status: 1,
                  reasons: product?.category_reasons?.map(
                    (reason) => reason.name
                  ),
                  brand: (product?.brand as any)?.brand_name,
                  visitButtonHref: product?.url,
                  detailsButtonHref: `${ROUTES.USER_DASHBOARD_PRODUCTS}/${product?.id}`,
                  titleHref: `${ROUTES.USER_DASHBOARD_PRODUCTS}/${product?.id}`,
                  isRisky: product?._category === 1,
                }}
              />
            )}
            {layout === "compact" && (
              <CompactBrandProductCard
                product={{
                  name: product?.title_text,
                  price,
                  discountedPrice,
                  imageUrl: absoluteImageUrl(product?.images?.[0]?.path),
                  platform: product?.platform?.name,
                  seller: product?.seller?.profile?.universal_name,
                  sellerUrl: `${ROUTES.USER_DASHBOARD_SELLERS}/${product?.seller?.profile?.id}`,
                  reasons: product?.category_reasons?.map(
                    (reason) => reason.name
                  ),
                  viewDetailsHref: product?.url,
                  isRisky: product?._category === 1,
                }}
              />
            )}
            {layout === "minimal" && (
              <MinimalBrandProductCard
                product={{
                  name: product?.title_text,
                  price,
                  discountedPrice,
                  imageUrl: absoluteImageUrl(product?.images?.[0]?.path),
                  platform: product?.platform?.name,
                }}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
