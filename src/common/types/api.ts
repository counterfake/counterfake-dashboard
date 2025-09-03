import { type AppError } from "@/common/lib/utils/error-handler";

export interface ApiConfig {
  baseURL: string;
  refreshEndpoint?: string;
  timeout?: number;
  retries?: number;
  headers?: FetchHeaders;
  requiresAuth?: boolean;
  endpoints?: Record<string, string>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  error: AppError | null;
}

export interface ApiRequestConfig {
  headers?: FetchHeaders;
  timeout?: number;
  retries?: number;
  requiresAuth?: boolean;
  params?: any;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken?: string;
}

// Fetch API Headers Interface
export interface FetchHeaders {
  // Content Headers
  "Content-Type"?:
    | "application/json"
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain"
    | "text/html"
    | "application/xml"
    | string;
  "Content-Length"?: string;
  "Content-Encoding"?: "gzip" | "deflate" | "br" | string;
  "Content-Language"?: string;
  "Content-Disposition"?: string;

  // Authorization Headers
  Authorization?: string;
  Bearer?: string;
  "X-API-Key"?: string;
  "X-Auth-Token"?: string;

  // Cache Headers
  "Cache-Control"?:
    | "no-cache"
    | "no-store"
    | "must-revalidate"
    | "public"
    | "private"
    | "max-age=0"
    | string;
  ETag?: string;
  "If-None-Match"?: string;
  "If-Modified-Since"?: string;
  "Last-Modified"?: string;

  // Accept Headers
  Accept?:
    | "application/json"
    | "application/xml"
    | "text/html"
    | "text/plain"
    | "*/*"
    | string;
  "Accept-Language"?: string;
  "Accept-Encoding"?: "gzip, deflate, br" | "gzip" | "deflate" | string;
  "Accept-Charset"?: string;

  // Request Headers
  "User-Agent"?: string;
  Referer?: string;
  Origin?: string;
  Host?: string;

  // CORS Headers
  "Access-Control-Allow-Origin"?: string;
  "Access-Control-Allow-Methods"?: string;
  "Access-Control-Allow-Headers"?: string;
  "Access-Control-Max-Age"?: string;

  // Custom Headers (commonly used)
  "X-Requested-With"?: "XMLHttpRequest" | string;
  "X-CSRF-Token"?: string;
  "X-Frame-Options"?: "DENY" | "SAMEORIGIN" | string;
  "X-Content-Type-Options"?: "nosniff";
  "X-XSS-Protection"?: "1; mode=block" | string;
  "X-Analytics-Version"?: string;
  "X-Client-Version"?: string;
  "X-Request-ID"?: string;
  "X-Correlation-ID"?: string;

  // Rate Limiting Headers
  "X-RateLimit-Limit"?: string;
  "X-RateLimit-Remaining"?: string;
  "X-RateLimit-Reset"?: string;

  // Generic string index for custom headers
  [key: string]: string | undefined;
}
