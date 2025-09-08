import { z } from "zod";
import {
  getProductByIdParamsSchema,
  getProductByIdResponseSchema,
  getProductsParamsSchema,
  getProductsResponseSchema,
} from "./schemas";

// --------------------------
// Params Types
// --------------------------
export type GetProductsParams = z.infer<typeof getProductsParamsSchema>;

export type GetProductByIdParams = z.infer<typeof getProductByIdParamsSchema>;

// --------------------------
// Response Types
// --------------------------
export type GetProductByIdResponse = z.infer<
  typeof getProductByIdResponseSchema
>;

export type GetProductsResponse = z.infer<typeof getProductsResponseSchema>;
