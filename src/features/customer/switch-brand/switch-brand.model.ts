import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

import { queryClient } from "@/shared/query-client";
import { updateSelectedCompany } from "@/shared/api/brand-protection/bp-api.service";

import { brandQueries } from "@/entities/brand-protection/brand/brand.model";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import { Brand } from "./switch-brand.types";

export const useSwitchBrand = () => {
  return useMutation({
    mutationFn: async (newBrandData: {
      brandName: string;
      brandId: number;
      isGroupBrand: boolean;
    }) => {
      const response = await updateSelectedCompany({
        brand_name: newBrandData.brandName,
        id: newBrandData.brandId,
        brand_type: newBrandData.isGroupBrand ? "group_brand" : "brand",
      });

      if (!response.success) {
        throw response.error;
      }

      return response.data;
    },
    onSuccess: () => {
      // Refetch all queries with "brand-protection" prefix
      queryClient.refetchQueries();
    },
  });
};

export const useSuspenseAllBrands = () => {
  const brandsQuery = brandQueries.list({
    limit: 150,
    page: 1,
  });

  const groupBrandsQuery = brandQueries.groupList({
    limit: 150,
    page: 1,
  });

  const { data: brandsData } = useSuspenseQuery(brandsQuery);
  const { data: groupBrandsData } = useSuspenseQuery(groupBrandsQuery);

  if (!brandsData.success) {
    throw brandsData.error;
  }

  const brands = brandsData.data?.brands;
  const groupBrands = groupBrandsData?.data;

  if (!brands) throw new Error("Brands not loaded");
  if (!groupBrands) throw new Error("Group brands not loaded");

  return {
    brands: brands,
    groupBrands,
  };
};

export const useCurrentBrand = (): Brand => {
  const { user } = useAuthStore(); // TODO: move this store to shared directory for feature-sliced design

  return {
    name: user?.brand?.name || "",
    id: Number(user?.brand?.id),
    isGroupBrand: user?.brand?.isGroupBrand || false,
  };
};
