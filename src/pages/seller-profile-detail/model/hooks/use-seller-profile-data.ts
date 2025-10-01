import { useSuspenseQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/common/lib/stores/auth-store";
import { sellerProfileQueries } from "@/entities/brand-protection/seller-profile";

export function useSuspenseSellerProfileData(id: number) {
  const { user } = useAuthStore();

  const { data: profile } = useSuspenseQuery(
    sellerProfileQueries.detail(id, {
      brandId: user?.brand?.id,
    })
  );

  return {
    profile,
  };
}
