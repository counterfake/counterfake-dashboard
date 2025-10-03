import { z } from "zod";

export const dashboardTypeSchema = z.enum(["admin", "customer"]);
export type DashboardType = z.infer<typeof dashboardTypeSchema>;

export const userRoleSchema = z.enum(["admin", "customer"]);
export type UserRole = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  id: z.string().or(z.number()),
  username: z.string(),
  email: z.string(),
  role: z.array(z.any()),
  brand: z.object({
    name: z.string().nullable().optional(), // TODO: Remove nullable and optional
    id: z.string().nullable().optional(), // TODO: Remove nullable and optional
    slug: z.string().nullable().optional(), // TODO: Remove nullable and optional
    isGroupBrand: z.boolean(),
    ownedBrands: z.array(z.number().optional()),
  }),
});
export type User = z.infer<typeof userSchema>;

export const authTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
  fetchedAt: z.number(),
});

export type AuthTokens = z.infer<typeof authTokensSchema>;
