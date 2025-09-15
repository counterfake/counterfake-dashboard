import { z } from "zod";

import {
  getProfileByIdParamsSchema,
  getProfileByIdResponseSchema,
} from "./schemas";

// --------------------------
// Params Types
// --------------------------
export type GetProfileByIdParams = z.infer<typeof getProfileByIdParamsSchema>;

// --------------------------
// Response Types
// --------------------------
export type GetProfileByIdResponse = z.infer<
  typeof getProfileByIdResponseSchema
>;
