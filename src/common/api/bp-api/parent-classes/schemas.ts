import { z } from "zod";

// --------------------------
// Params Schemas
// --------------------------
export const getParentClassesParamsSchema = z.object({
  brand: z.string().optional(),
  do_analysis: z.boolean().optional(),
});

// --------------------------
// Response Schemas
// --------------------------
export const getParentClassByIdResponseSchema = z.object({
  index: z.number(),
  is_child_support: z.boolean(),
  name: z.string(),
  details_for_risky: z.object({
    risky_count: z.number(),
    total_count: z.number(),
  }),
});

export const getParentClassesResponseSchema = z.object({
  hidden_parent_classes: getParentClassByIdResponseSchema.array(),
  parent_classes: getParentClassByIdResponseSchema.array(),
});
