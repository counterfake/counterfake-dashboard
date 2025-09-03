import { z } from "zod";

export const categoryReasonSchema = z.object({
  index: z.number(),
  name: z.string(),
});

export const getCategoryReasonsParamsSchema = z.object({
  page_size: z.number().optional(),
  page_number: z.number().optional(),
});

export const getCategoryReasonsResponseSchema = z.object({
  page_size: z.number(),
  page_count: z.number(),
  data_count: z.number(),
  page_number: z.number(),
  generated_at: z.string(),
  results: z.array(categoryReasonSchema),
});
