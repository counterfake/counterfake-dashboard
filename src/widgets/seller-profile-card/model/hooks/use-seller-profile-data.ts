import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import {
  sellerProfileQueries,
  sellerProfileService,
} from "@/entities/brand-protection/seller-profile";

export function useSellerProfileData(sellerId: number) {
  const { user } = useAuthStore();

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    ...sellerProfileQueries.detail(sellerId, {
      brandId: user?.brand?.id,
    }),
  });

  const brandIds = user?.brand?.ownedBrands;
  const stats = sellerProfileService.getProductCountByBrand(profile, brandIds);

  const accountCount = profile?.sellers?.length || 0;

  const categoryLabel = sellerProfileService.getCategoryLabel(
    profile?.category
  );
  const categoryIcon = sellerProfileService.getCategoryIcon(profile?.category);
  const categoryVariant = sellerProfileService.getCategoryVariant(
    profile?.category
  );

  return {
    profile,
    stats: {
      ...stats,
      accountCount,
    },
    category: {
      label: categoryLabel,
      icon: categoryIcon,
      variant: categoryVariant,
    } as const,
    isLoading,
    isError,
  };
}
