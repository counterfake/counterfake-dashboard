import { z } from "zod";

import {
  getParentClassByIdResponseSchema,
  getParentClassesParamsSchema,
  getParentClassesResponseSchema,
} from "./schemas";

// --------------------------
// Params Types
// --------------------------
export type GetParentClassesParams = z.infer<
  typeof getParentClassesParamsSchema
>;

// --------------------------
// Response Types
// --------------------------
export type GetParentClassByIdResponse = z.infer<
  typeof getParentClassByIdResponseSchema
>;

export type GetParentClassesResponse = z.infer<
  typeof getParentClassesResponseSchema
>;
