import { useApiQuery } from "@/common/hooks/use-http-client";
import { useAuthStore } from "@/common/lib/stores/auth-store";

import { sellerProfileService } from "../services/seller-profile.service";

const NAMESPACE = "seller-profile";

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
