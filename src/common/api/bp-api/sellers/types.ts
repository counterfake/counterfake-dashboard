import { z } from "zod";

import {
  getSellersTopFakesParamsSchema,
  getSellersTopFakesResponseSchema,
  getSellerByIdResponseSchema,
} from "./schemas";

// --------------------------
// Params Types
// --------------------------
export type GetSellersTopFakesParams = z.infer<
  typeof getSellersTopFakesParamsSchema
>;

// --------------------------
// Response Types
// --------------------------
export type GetSellersTopFakesResponse = z.infer<
  typeof getSellersTopFakesResponseSchema
>;

export type GetSellerByIdResponse = z.infer<typeof getSellerByIdResponseSchema>;
