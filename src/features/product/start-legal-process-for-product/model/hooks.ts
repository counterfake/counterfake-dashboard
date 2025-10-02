import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CUSTOMER_PRODUCTS_NAMESPACE } from "@/features/products";

import {
  createPlatformReportMail,
  updateProduct,
} from "@/shared/api/brand-protection/bp-api.service";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import { caseKeys } from "@/entities/brand-protection/case";
import { ProductReportStatusId } from "@/entities/brand-protection/product/model";

export function useStartLegalProcessForProduct() {
  const queryClient = useQueryClient();

  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async ({
      platformId,
      productId,
    }: {
      platformId: number;
      productId: number;
    }) => {
      // Update the product report status to notified to find out report
      await updateProduct(productId, {
        report: ProductReportStatusId.Notified,
      });

      await createPlatformReportMail({
        brands: user.brand.ownedBrands,
        sender: user.email,
        platform: platformId,
        products: productId.toString(),
      });

      return true;
    },
    onSuccess: (_, { productId }) => {
      // Invalidate product cases queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: caseKeys.productCases(),
      });
      // Invalidate product queries to refetch updated data
      queryClient.invalidateQueries({
        // This key usage is old. Product queries are going to move to product entity
        queryKey: [CUSTOMER_PRODUCTS_NAMESPACE, String(productId)],
      });
    },
  });
}
