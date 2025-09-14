import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

import { queryClient } from "@/shared/query-client";
import { updateSelectedCompany } from "@/shared/api/brand-protection/bp-api.service";

import { brandsQueryOptions } from "@/entities/brand-protection/brand/brand.model";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import { Brand } from "./switch-brand.types";

export const useSwitchBrand = () => {
  return useMutation({
    mutationFn: async (newBrandData: {
      brandName: string;
      brandId: number;
    }) => {
      const response = await updateSelectedCompany({
        brand_name: newBrandData.brandName,
        id: newBrandData.brandId,
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

export const useSuspenseBrandsQuery = () => {
  const brandsQuery = brandsQueryOptions({
    limit: 150,
    page: 1,
  });

  const { data: brandsData } = useSuspenseQuery(brandsQuery);

  if (!brandsData.success) {
    throw brandsData.error;
  }

  const brands = brandsData.data?.brands;

  if (!brands) {
    throw new Error("Brands not loaded");
  }

  return brands.map((brand) => ({
    name: brand.name,
    id: brand.id,
  }));
};

export const useCurrentBrand = (): Brand => {
  const { user } = useAuthStore(); // TODO: move this store to shared directory for feature-sliced design

  return {
    name: user?.brand?.name,
    id: Number(user?.brand?.id),
  };
};
