import { z } from "zod";

export const categoryReasonSchema = z.object({
  index: z.number(),
  name: z.string(),
});

export type CategoryReason = z.infer<typeof categoryReasonSchema>;

export const getCategoryReasonsParamsSchema = z.object({
  page_size: z.number().optional(),
  page_number: z.number().optional(),
});

export type GetCategoryReasonsParams = z.infer<
  typeof getCategoryReasonsParamsSchema
>;

export const getCategoryReasonsResponseSchema = z.object({
  page_size: z.number(),
  page_count: z.number(),
  data_count: z.number(),
  page_number: z.number(),
  generated_at: z.string(),
  results: z.array(categoryReasonSchema),
});

export type GetCategoryReasonsResponse = z.infer<
  typeof getCategoryReasonsResponseSchema
>;
