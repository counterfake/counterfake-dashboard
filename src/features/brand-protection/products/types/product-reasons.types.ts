import { z } from "zod";
import {
  categoryReasonSchema,
  getCategoryReasonsParamsSchema,
  getCategoryReasonsResponseSchema,
} from "../schemas/product-reasons.schemas";

export type CategoryReason = z.infer<typeof categoryReasonSchema>;

export type GetCategoryReasonsParams = z.infer<
  typeof getCategoryReasonsParamsSchema
>;

export type GetCategoryReasonsResponse = z.infer<
  typeof getCategoryReasonsResponseSchema
>;
