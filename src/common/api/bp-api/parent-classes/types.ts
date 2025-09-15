import { z } from "zod";

import {
  getParentClassByIdParamsSchema,
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

export type GetParentClassByIdParams = z.infer<
  typeof getParentClassByIdParamsSchema
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
