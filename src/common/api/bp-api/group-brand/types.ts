import { z } from "zod";

import {
  getGroupBrandsParamsSchema,
  getGroupBrandsResponseSchema,
} from "./schemas";

// --------------------------
// Params Types
// --------------------------
export type GetGroupBrandsParams = z.infer<typeof getGroupBrandsParamsSchema>;

// --------------------------
// Response Types
// --------------------------
export type GetGroupBrandsResponse = z.infer<
  typeof getGroupBrandsResponseSchema
>;
