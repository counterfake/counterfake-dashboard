import { createJSONStorage } from "@/shared/lib/create-json-storage";
import { AuthTokens } from "./bp-api.types";

const BP_API_AUTH_STORAGE_KEY = "bp-api-auth";

const initialSession: AuthTokens = {
  accessToken: null,
  refreshToken: null,
  expiresIn: 0,
  fetchedAt: 0,
};

export const bpApiAuthStorage = createJSONStorage<AuthTokens>(
  BP_API_AUTH_STORAGE_KEY,
  initialSession
);
