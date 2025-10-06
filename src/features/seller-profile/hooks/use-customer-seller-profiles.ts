import { useApiQuery } from "@/common/hooks/use-http-client";
import { useAuthStore } from "@/common/lib/stores/auth-store";

import { sellerProfileService } from "../services/seller-profile.service";

const NAMESPACE = "seller-profile";

export function useGetSellerProfileById(id: number) {
  const { user } = useAuthStore();

  const brands = user?.brand?.ownedBrands.join(",");

  return useApiQuery({
    queryKey: [NAMESPACE, id, brands],
    queryFn: () => {
      return sellerProfileService.getSellerProfileById(id, {
        brand: brands || "",
      });
    },
    enabled: !!brands && !!id,
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

  const brands = user?.brand?.ownedBrands.join(",");

  return useApiQuery({
    queryKey: [NAMESPACE, "sellers-top-fakes", brands],
    queryFn: () => {
      return sellerProfileService.getSellersTopFakes({
        brand: brands || "",
      });
    },
    enabled: !!brands,
    emptyData: [],
  });
}
