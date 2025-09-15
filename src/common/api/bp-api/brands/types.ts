import { z } from "zod";

import { getBrandsParamsSchema, getBrandsResponseSchema } from "./schemas";

// --------------------------
// Params Types
// --------------------------
export type GetBrandsParams = z.infer<typeof getBrandsParamsSchema>;

// --------------------------
// Response Types
// --------------------------
export type GetBrandsResponse = z.infer<typeof getBrandsResponseSchema>;
