import { z } from "zod";

import { UserRole } from "@/common/types/auth";

export const loginCredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.string(),
});

export const refreshTokenRequestSchema = z.object({
  token: z.string(),
});

export const refreshTokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.string(),
});

export const userResponseSchema = z.object({
  ip: z.string(),
  user: z.object({
    username: z.string(),
    date_joined: z.string(),
    props: z.array(z.string()),
  }),
  firebase_user: z.object({
    id: z.string(),
    uid: z.string(),
    brandName: z.string(),
    displayName: z.string(),
    entities: z.array(z.string()),
    selectedCompany: z.object({
      brand_name: z.string(),
      id: z.number(),
    }),
    roles: z.array(z.custom<UserRole>()),
    companyName: z.string(),
    accessibleGroupBrands: z.array(z.number()),
    accessibleBrands: z.array(z.number()),
  }),
});

export const setPasswordRequestSchema = z.object({
  old_password: z.string(),
  new_password: z.string(),
});

export const resetPasswordRequestSchema = z.object({
  email: z.string(),
});

export const selectedCompanyRequestSchema = z.object({
  id: z.number(),
  brand_name: z.string(),
});
