"use client";

import {
  useGetCustomerProductById,
  useGetProductCategoryById,
} from "@/features/products";
import { useGetSellerProfileById } from "@/features/seller-profile";

export const useProductDetailPageData = (productId: string) => {
  // --------------------------
  // Fetch data
  // --------------------------
  const productResponse = useGetCustomerProductById(productId);

  const productCategoryResponse = useGetProductCategoryById(
    productResponse.data?.subCategory?.parentCategoryId,
    {
      doAnalysis: true,
    }
  );

  const profileResponse = useGetSellerProfileById(
    productResponse.data?.profile?.id
  );

  return {
    productResponse,
    productCategoryResponse,
    profileResponse,
  };
};
