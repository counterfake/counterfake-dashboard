import { z } from "zod";

// --------------------------
// Params Schemas
// --------------------------

// --------------------------
// Response Schemas
// --------------------------
export const getPlatformByIdResponseSchema = z.object({
  contact_mail: z.string(),
  created_at: z.string(),
  deleted_at: z.string().optional(),
  description: z.string(),
  forced_category: z.any(),
  icon_link: z.string(),
  id: z.number(),
  in_scope: z.boolean(),
  is_second_hand_platform: z.boolean(),
  is_secure: z.boolean(),
  links: z.array(z.any()),
  name: z.string(),
  updated_at: z.string(),
});
