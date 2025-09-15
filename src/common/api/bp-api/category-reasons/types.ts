import { z } from "zod";
import {
  getCategoryReasonsParamsSchema,
  getCategoryReasonsResponseSchema,
} from "./schemas";

// --------------------------
// Params Types
// --------------------------
export type GetCategoryReasonsParams = z.infer<
  typeof getCategoryReasonsParamsSchema
>;

// --------------------------
// Response Types
// --------------------------
export type GetCategoryReasonsResponse = z.infer<
  typeof getCategoryReasonsResponseSchema
>;
