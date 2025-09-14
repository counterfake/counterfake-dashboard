import { useApiQuery } from "@/common/hooks/use-http-client";
import { customerService } from "../services/customer.service";

export const useCurrentCustomer = (options: { enabled: boolean }) => {
  return useApiQuery({
    queryKey: ["current-customer"],
    queryFn: () => customerService.fetchCurrentCustomer(),
    enabled: options.enabled,
  });
};
