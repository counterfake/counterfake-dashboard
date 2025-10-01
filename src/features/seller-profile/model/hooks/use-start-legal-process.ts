import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProfile } from "@/shared/api/brand-protection/bp-api.service";
import { SellerProfileCategory } from "@/entities/brand-protection/seller-profile/model/types";
import { sellerProfileKeys } from "@/entities/brand-protection/seller-profile";

export function useStartLegalProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sellerId: number) => {
      return updateProfile(sellerId, {
        category: SellerProfileCategory.REPORTED,
      });
    },
    onSuccess: (_, sellerId) => {
      // Invalidate seller profile queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: sellerProfileKeys.details,
      });
    },
  });
}
