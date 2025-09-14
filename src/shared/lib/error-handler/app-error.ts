import { z } from "zod";
import { formatZodErrorAsArray } from "./zod-formatters";
import { ErrorType, AppErrorResult } from "./types";

/**
 * AppError is a normalized error wrapper used across the application to provide
 * consistent, user-friendly messages and rich metadata regardless of the error source.
 *
 * Responsibilities:
 * - Classifies errors into well-known types: `validation`, `network`, `auth`, `server`,
 *   `client`, and `unknown`.
 * - Aggregates multiple messages (e.g., from Zod validation) into a single array and
 *   a readable combined message string.
 * - Preserves the original error and any HTTP response information (status code) for
 *   debugging and UI handling.
 * - Optionally logs contextual information when a `context` string is provided.
 *
 * Typical usage:
 * @example
 *   try {
 *     // ... your logic
 *   } catch (err) {
 *     // Create a standardized error instance (optionally with context)
 *     const appError = new AppError(err, "ProductsService:fetchById");
 *     // Access normalized data for UI or logging
 *     // appError.type, appError.message, appError.messages, appError.response?.status
 *     throw appError; // or handle gracefully
 *   }
 */
export class AppError {
  public type: ErrorType;
  public message: string;
  public messages?: string[];
  public details?: any;
  public originalError?: any;
  public response?: {
    status: number;
  };

  constructor(error: any, context?: string) {
    const processedError = this.handle(error, context);

    this.type = processedError.type;
    this.message = processedError.message;
    this.messages = processedError.messages;
    this.details = processedError.details;
    this.originalError = processedError.originalError;
    this.response = processedError.response;
  }

  // Determine error type
  static determineErrorType(error: any): ErrorType {
    if (error instanceof z.ZodError) return "validation";
    if (error?.response?.status === 401 || error?.response?.status === 403)
      return "auth";
    if (error?.response?.status >= 500) return "server";
    if (error?.code === "NETWORK_ERROR" || !navigator.onLine) return "network";
    if (error instanceof Error) return "client";
    return "unknown";
  }

  private handle(error: any, context?: string): AppErrorResult {
    const errorType = AppError.determineErrorType(error);
    let message = "";
    let details = null;

    let messages: string[] | undefined;
    const response = {
      status: error?.response?.status,
    };

    switch (errorType) {
      case "validation":
        const zodError = error as z.ZodError;
        messages = formatZodErrorAsArray(zodError);
        message = messages.join("; ");
        details = zodError.errors;
        break;

      case "auth":
        message = error?.response?.data?.message || "Authentication error";
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          message = "Invalid credentials";
          messages = [message];
        }
        break;

      case "network":
        message = "Network connection error. Please check your connection";
        messages = [message];
        break;

      case "server":
        message = "Server error. Please try again later";
        messages = [message];
        break;

      case "client":
        const clientError = error as Error;
        message = clientError.message;
        messages = [message];
        break;

      default:
        message = "An unexpected error occurred";
        messages = [message];
    }

    const appError: AppErrorResult = {
      type: errorType,
      message,
      messages,
      details,
      originalError: error,
      response,
    };

    // If context is provided, add it to the error message
    if (context) {
      console.error(`Error in ${context}:`, appError);
    }

    return appError;
  }

  toJSON(): AppErrorResult {
    return {
      type: this.type,
      message: this.message,
      messages: this.messages,
      details: this.details,
      originalError: this.originalError,
      response: this.response,
    };
  }
}
