import { z } from "zod";

import { whoamiResponseSchema } from "../schemas/user.schemas";

export type WhoamiResponse = z.infer<typeof whoamiResponseSchema>;
