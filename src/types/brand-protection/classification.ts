import { z } from "zod";

export const getClassesParamsSchema = z.object({
  brand: z.string().optional(),
});

export type GetClassesParams = z.infer<typeof getClassesParamsSchema>;

export const classSchema = z.object({
  brand: z.number(),
  index: z.number(),
  is_child_support: z.boolean(),
  name: z.string(),
  details_for_categories: z.object({
    category: z.number(),
    count: z.number(),
  }),
  details_for_risky: z.object({
    risky_count: z.number(),
    total_count: z.number(),
  }),
});

export type Class = z.infer<typeof classSchema>;

export const getClassesResponseSchema = z.object({
  classes: classSchema.array(),
  hidden_classes: classSchema.array(),
});

export type GetClassesResponse = z.infer<typeof getClassesResponseSchema>;

export const getParentClassesParamsSchema = z.object({
  brand: z.string().optional(),
  do_analysis: z.boolean().optional(),
});

export type GetParentClassesParams = z.infer<
  typeof getParentClassesParamsSchema
>;

export const parentClassSchema = z.object({
  index: z.number(),
  is_child_support: z.boolean(),
  name: z.string(),
  details_for_risky: z.object({
    risky_count: z.number(),
    total_count: z.number(),
  }),
});

export type ParentClass = z.infer<typeof parentClassSchema>;

export const getParentClassesResponseSchema = z.object({
  hidden_parent_classes: parentClassSchema.array(),
  parent_classes: parentClassSchema.array(),
});

export type GetParentClassesResponse = z.infer<
  typeof getParentClassesResponseSchema
>;
