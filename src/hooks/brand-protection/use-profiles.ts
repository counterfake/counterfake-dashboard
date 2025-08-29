import { GetProfileByIdParams } from "@/types/brand-protection/profile";

import { bpApiClient } from "@/lib/api/clients/brand-protection";

import { useApiQuery } from "../use-http-client";

export function useProfileById(id: string, params?: GetProfileByIdParams) {
  return useApiQuery({
    queryKey: ["profile", id, params],
    queryFn: () => bpApiClient.profileService.getProfileById(id, params),
    enabled: !!id,
  });
}
