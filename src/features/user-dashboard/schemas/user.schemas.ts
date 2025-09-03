import { z } from "zod";

import { UserRole } from "@/common/types/auth";

export const whoamiResponseSchema = z.object({
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
