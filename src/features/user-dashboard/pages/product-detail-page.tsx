"use client";

import React from "react";
import { useParams } from "next/navigation";

import { ROUTES } from "@/lib/config/routes";

// Components
import DashboardPageWrapper from "../components/dashboard-page-wrapper";
import ProductImageGallery from "../product-detail/components/product-image-gallery";
import ProductInfoCard from "../product-detail/components/product-info-card";
import ProductDetailsCard from "../product-detail/components/product-details-card";
import ProductRating from "../product-detail/components/product-rating";

// Hooks
import { useProductDetail } from "../product-detail/hooks/use-product-detail";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;

  const { productResponse } = useProductDetail(productId);

  const productData = productResponse.data;

  return (
    <DashboardPageWrapper
      title="Product Detail"
      description="View comprehensive information about the reported product"
      breadcrumbs={[
        {
          label: "Dashboard",
          href: ROUTES.USER_DASHBOARD,
        },
        {
          label: "Products",
          href: ROUTES.USER_DASHBOARD_PRODUCTS,
        },
        {
          label: productData?.name || "Product Detail",
          current: true,
        },
      ]}
    >
      <div className="space-y-6 fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Image Gallery */}
          <ProductImageGallery
            images={productData?.images || []}
            productName={productData?.name || ""}
            isLoading={productResponse.isLoading}
          />

          {/* Product Basic Info */}
          <div className="space-y-6">
            <ProductInfoCard
              product={productData}
              isLoading={productResponse.isLoading}
            />

            <ProductRating
              rating={productData?.rating}
              isLoading={productResponse.isLoading}
            />
          </div>
        </div>

        {/* Product Details */}
        <ProductDetailsCard
          isLoading={productResponse.isLoading}
          productDescription={productData?.description || ""}
          reportData={{
            reportReasons: productData?.reportReason || [],
            isRiskyRating: productData?.isRiskyRating || false,
            isRatingAvailable: productData?.isRatingAvailable || false,
            isPriceOutlier: productData?.isPriceOutlier || false,
            isRiskySeller: productData?.seller.isRisky || false,
          }}
        />
      </div>
    </DashboardPageWrapper>
  );
}
