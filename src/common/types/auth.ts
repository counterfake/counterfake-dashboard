import { z } from "zod";

export const dashboardTypeSchema = z.enum(["admin", "user"]);
export type DashboardType = z.infer<typeof dashboardTypeSchema>;

export const userRoleSchema = z.enum(["admin", "user"]);
export type UserRole = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  id: z.string().or(z.number()),
  username: z.string(),
  role: z.array(z.any()),
  brand: z.object({
    name: z.string(),
    id: z.string().nullable(),
    slug: z.string(),
    isGroupBrand: z.boolean(),
    subBrands: z.array(z.number()).nullable(),
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
