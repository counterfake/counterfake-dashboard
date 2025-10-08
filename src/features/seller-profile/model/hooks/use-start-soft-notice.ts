import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProfile } from "@/shared/api/brand-protection/bp-api.service";
import { SellerProfileSoftNoticeStatus } from "@/entities/brand-protection/seller-profile/model/types";
import { sellerProfileKeys } from "@/entities/brand-protection/seller-profile";

export function useStartSoftNotice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sellerId: number) => {
      return updateProfile(sellerId, {
        soft_notice: SellerProfileSoftNoticeStatus.INITIATED,
      });
    },
    onSuccess: (_, sellerId) => {
      queryClient.invalidateQueries({
        queryKey: sellerProfileKeys.detail(sellerId),
      });
      queryClient.invalidateQueries({
        queryKey: sellerProfileKeys.onlineTakedownCaseLists(),
      });
    },
  });
}
