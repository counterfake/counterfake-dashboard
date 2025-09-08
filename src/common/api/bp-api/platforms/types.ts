import { z } from "zod";
import { getPlatformByIdResponseSchema } from "./schemas";

// --------------------------
// Params Types
// --------------------------

// --------------------------
// Response Types
// --------------------------
export type GetPlatformByIdResponse = z.infer<
  typeof getPlatformByIdResponseSchema
>;
