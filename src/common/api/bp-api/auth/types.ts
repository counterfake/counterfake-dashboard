import { z } from "zod";

import {
  refreshTokenParamsSchema,
  resetPasswordParamsSchema,
  selectedCompanyParamsSchema,
  setPasswordParamsSchema,
  loginParamsSchema,
  loginResponseSchema,
  refreshTokenResponseSchema,
  whoamiResponseSchema,
} from "./schemas";

// --------------------------
// Params Types
// --------------------------
export type LoginParams = z.infer<typeof loginParamsSchema>;
export type RefreshTokenParams = z.infer<typeof refreshTokenParamsSchema>;
export type ResetPasswordParams = z.infer<typeof resetPasswordParamsSchema>;
export type SelectedCompanyParams = z.infer<typeof selectedCompanyParamsSchema>;
export type SetPasswordParams = z.infer<typeof setPasswordParamsSchema>;

// --------------------------
// Response Types
// --------------------------
export type WhoamiResponse = z.infer<typeof whoamiResponseSchema>;
export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
