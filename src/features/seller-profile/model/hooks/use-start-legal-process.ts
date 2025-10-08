import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProfile } from "@/shared/api/brand-protection/bp-api.service";
import { SellerProfileLegalTakedownStatus } from "@/entities/brand-protection/seller-profile/model/types";
import { sellerProfileKeys } from "@/entities/brand-protection/seller-profile";

export function useStartLegalProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sellerId: number) => {
      return updateProfile(sellerId, {
        legal_takedown: SellerProfileLegalTakedownStatus.INITIATED,
      });
    },
    onSuccess: (_, sellerId) => {
      // Invalidate seller profile queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: sellerProfileKeys.detail(sellerId),
      });
      queryClient.invalidateQueries({
        queryKey: sellerProfileKeys.legalTakedownCaseLists(),
      });
    },
  });
}
