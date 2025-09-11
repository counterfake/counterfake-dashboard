import { useApiQuery } from "@/common/hooks/use-http-client";
import { useAuthStore } from "@/common/lib/stores/auth-store";

import { sellerProfileService } from "../services/seller-profile.service";

const NAMESPACE = "seller-profile";

export function useGetSellerProfileById(id: number) {
  const { user } = useAuthStore();

  return useApiQuery({
    queryKey: [NAMESPACE, id, user?.brand?.id],
    queryFn: () => {
      return sellerProfileService.getSellerProfileById(id, {
        brand: user?.brand?.id || "",
      });
    },
    enabled: !!user?.brand?.id && !!id,
    emptyData: {
      address: "",
      category: null,
      ai_results: null,
      brands: null,
      created_at: "",
      email: "",
      id: null,
      is_closed: false,
      mersis_number: "",
      phone_number: "",
      platforms: null,
      sellers: null,
      stats: null,
      updated_at: "",
      universal_name: "",
      tax_number: "",
    },
  });
}

export function useGetCustomerSellersTopFakes() {
  const { user } = useAuthStore();

  return useApiQuery({
    queryKey: [NAMESPACE, "sellers-top-fakes", user?.brand?.id],
    queryFn: () => {
      return sellerProfileService.getSellersTopFakes({
        brand: user?.brand?.id || "",
      });
    },
    enabled: !!user?.brand?.id,
    emptyData: [],
  });
}
