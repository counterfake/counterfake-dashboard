"use client";

import { useMemo } from "react";

import { convertRatingTo5Based } from "@/lib/utils/convert-rating-5-based";
import { absoluteImageUrl } from "@/lib/utils/absolute-image-url";

import { useProductById } from "@/hooks/brand-protection/use-products";
import { useCategoryById } from "@/hooks/brand-protection/use-categories";
import { useProductReportStatusById } from "@/hooks/brand-protection/use-product-report-status";
import { useProfileById } from "@/hooks/brand-protection/use-profiles";

// Mock product type
export interface Product {
  id: string;
  name: string;
  images: string[];
  seller: {
    name: string;
    id: string;
    isVerified: boolean;
  };
  listedDate: string;
  reportedDate: string;
  category: string;
  brand: string;
  platform: string;
  reportReason: string;
  description: string;
  listingUrl: string;
  rating: number;
  totalReviews: number;
  price: number;
  originalPrice?: number;
  status: "active" | "reported" | "removed";
}

export const useProductDetail = (productId: string) => {
  // --------------------------
  // Fetch data
  // --------------------------
  const productResponse = useProductById(productId, {
    expand_relations:
      "classification,images,seller.profile,platform,brand,category_reasons",
  });

  const profileResponse = useProfileById(
    productResponse.data?.seller?.profile?.id as any
  );

  const statusCategory = useCategoryById(
    productResponse.data?._category as any
  );
  const reportStatus = useProductReportStatusById(
    productResponse.data?.report as any
  );

  // --------------------------
  // Extract data from responses
  // --------------------------
  const productData = useMemo(() => productResponse.data, [productResponse]);
  const profileData = useMemo(() => profileResponse.data, [profileResponse]);

  // --------------------------
  // Data Transformations
  // --------------------------
  const images = useMemo(
    () =>
      productData?.images?.map((image) => absoluteImageUrl(image?.path)) || [],
    [productData]
  );

  const reasons = useMemo(
    () => productData?.category_reasons?.map((reason) => reason.name) || [],
    [productData]
  );

  const rating = useMemo(() => {
    const rating = productData?.rating;

    if (rating === -1 || !rating) return null;

    // Convert rating from 100-based scale to 5-based scale
    return convertRatingTo5Based(rating);
  }, [productData]);

  const price = useMemo(() => {
    const price = productData?.realPrice;

    if (price === -1) return null;

    return price;
  }, [productData]);

  const discountedPrice = useMemo(() => {
    const discountedPrice = productData?.discountedPrice;

    if (discountedPrice === -1) return null;

    return discountedPrice;
  }, [productData]);

  const discountPercentage = useMemo(() => {
    if (!price || !discountedPrice) return null;

    const discountPercentage = Math.round((1 - price / discountedPrice) * 100);

    return discountPercentage;
  }, [price, discountedPrice]);

  const brand = useMemo(() => {
    if (typeof productData?.brand !== "object") return null;

    return productData?.brand?.brand_name;
  }, [productData]);

  const category = useMemo(() => {
    if (typeof productData?.classification !== "object") return null;

    return productData?.classification.name;
  }, [productData]);

  const transformedProduct = useMemo(
    () => ({
      name: productData?.title_text || "",
      images,
      seller: {
        name: profileData?.universal_name || "",
        id: String(profileData?.id) || "",
        isVerified: profileData?.category === 0, // Official seller
        isClosed: profileData?.is_closed || false, // Seller is closed
        isRisky: profileData?.category === 1, // Seller is risky
      },
      listedDate: productData?.created_at || "",
      reportedDate: productData?.reported_at || "",
      statusCategory: statusCategory?.label || "",
      category: category || "",
      brand,
      platform: productData?.platform?.name || "",
      reportReason: reasons,
      description: productData?.description_text || "",
      listingUrl: productData?.url || "",
      rating,
      isRiskyRating: rating ? rating < 3 : false,
      isRatingAvailable: rating !== null,
      isPriceOutlier: productData?.price_isOutlier,
      price: price ? `${price} ${productData?.currency}` : "No price available",
      discountedPrice: discountedPrice
        ? `${discountedPrice} ${productData?.currency}`
        : null,
      discountPercentage: discountPercentage,
      status: reportStatus?.label || "",
    }),
    [
      productData,
      profileData,
      statusCategory,
      reportStatus,
      images,
      reasons,
      rating,
      price,
      discountedPrice,
      discountPercentage,
      brand,
    ]
  );

  return {
    productResponse: {
      ...productResponse,
      data: transformedProduct,
    },
  };
};
