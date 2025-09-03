import { z } from "zod";
import {
  loginCredentialsSchema,
  loginResponseSchema,
  refreshTokenRequestSchema,
  refreshTokenResponseSchema,
  resetPasswordRequestSchema,
  selectedCompanyRequestSchema,
  setPasswordRequestSchema,
  userResponseSchema,
} from "../schemas/user-auth.schemas";

export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>;

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;

export type SetPasswordRequest = z.infer<typeof setPasswordRequestSchema>;

export type ResetPasswordRequest = z.infer<typeof resetPasswordRequestSchema>;

export type SelectedCompanyRequest = z.infer<
  typeof selectedCompanyRequestSchema
>;
