import { API_CONFIG } from "@/lib/config/api";

import { HttpClient } from "../http-client";

export class ProductAnalysisAPIClient extends HttpClient {
  constructor() {
    super({
      baseURL: API_CONFIG.productAnalysisApi.baseURL,
    });
  }
}

/**
 * Product Analysis API Client
 */
export const productAnalysisApiClient = new ProductAnalysisAPIClient();
