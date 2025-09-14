"use client";

import React from "react";
import { useParams } from "next/navigation";

import { ROUTES } from "@/common/lib/config/routes";

// Components
import {
  ProductAnalysis,
  ProductImageGallery,
  ProductInfoCard,
} from "@/features/products";
import { CustomerPageWrapper } from "@/widgets/customer-page-layout/customer-page-layout.ui";

// Hooks
import { useProductDetailPageData } from "./_hooks/use-product-detail-page-data";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;

  const { productResponse, productCategoryResponse } =
    useProductDetailPageData(productId);

  const productData = productResponse.data;

  return (
    <CustomerPageWrapper
      title="Product Details"
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
          label: productData?.name || "Product Details",
          current: true,
        },
      ]}
    >
      <div className="space-y-6 fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
          {/* Product Image Gallery */}
          <div className="lg:sticky top-10 self-start">
            <ProductImageGallery
              images={productData?.images || []}
              productName={productData?.name || ""}
              isLoading={productResponse.isLoading}
            />
          </div>

          <ProductInfoCard
            product={{
              ...productData,
              category: productCategoryResponse?.data?.name,
            }}
            isLoading={productResponse.isLoading}
          />
        </div>

        <ProductAnalysis
          analysis={{
            analysisSummaryText: productData?.analysis?.analysisSummaryText,
            reportReasons: productData?.analysis?.reportReasons,
            status: productData?.analysis?.status,
            statusId: productData?.analysis?.statusId,
            daysSinceListed: productData?.analysis?.daysSinceListed,
            daysSinceReported: productData?.analysis?.daysSinceReported,
            fakeScore: productData?.analysis?.fakeScore,
            fakeScoreProbability: productData?.analysis?.fakeScoreProbability,
            sellerIsRisky: productData?.analysis?.isRisky,
            rating: productData?.analysis?.rating,
            isLowRating: productData?.analysis?.isLowRating,
            isPriceOutlier: productData?.analysis?.isPriceOutlier,
          }}
          isLoading={productResponse.isLoading}
        />
      </div>
    </CustomerPageWrapper>
  );
}
