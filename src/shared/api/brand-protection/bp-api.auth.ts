import axios, { AxiosResponse } from "axios";

import { bpApiAuthStorage } from "./bp-api.storage";
import { BP_API_BASE_URL, BP_API_ENDPOINTS } from "./bp-api.config";
import {
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  type AuthTokens,
} from "./bp-api.types";
import {
  AuthTokensSchema,
  RefreshTokenResponseDtoSchema,
} from "./bp-api.schemas";
import { bpApi } from "./bp-api.instance";

export function getSession(): AuthTokens {
  const session = bpApiAuthStorage.getItem();

  return session;
}

export function updateSession(session: Omit<AuthTokens, "fetchedAt">) {
  const validatedSession = AuthTokensSchema.omit({ fetchedAt: true }).safeParse(
    session
  );

  if (!validatedSession.success) {
    return;
  }

  bpApi.client.defaults.headers.common.Authorization = `Bearer ${validatedSession.data.accessToken}`;

  bpApiAuthStorage.setItem({
    ...validatedSession.data,
    fetchedAt: Date.now(),
  });
}

export function removeSession() {
  bpApiAuthStorage.removeItem();
}

export async function refreshTokens() {
  const session = getSession();

  if (!session.refreshToken) {
    return { success: false };
  }

  const payload: RefreshTokenRequestDto = {
    token: session?.refreshToken,
  };

  const responsePromise = axios.post(
    BP_API_BASE_URL + BP_API_ENDPOINTS.refresh,
    payload
  );

  const response =
    (await responsePromise) as AxiosResponse<RefreshTokenResponseDto>;

  const validatedResponse = RefreshTokenResponseDtoSchema.safeParse(
    response.data
  );

  if (!validatedResponse.success) {
    return { success: false };
  }

  updateSession({
    accessToken: validatedResponse.data.access_token,
    refreshToken: validatedResponse.data.refresh_token,
    expiresIn: Number(validatedResponse.data.expires_in),
  });

  return { success: true };
}
