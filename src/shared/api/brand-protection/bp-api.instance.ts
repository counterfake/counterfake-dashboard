import { HttpClient } from "../http-client";

import { BP_API_BASE_URL } from "./bp-api.config";

export const bpApi = new HttpClient({
  baseURL: BP_API_BASE_URL,
});
