import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/common/lib/stores/auth-store";

import { internalEmailService } from "../services/internal-email-service";

export function useBetaFeedback() {
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: (feedback: string) =>
      internalEmailService.sendBetaFeedback(feedback, {
        name: user?.username || "",
        brandName: user?.brand.name || "",
      }),
  });
}
