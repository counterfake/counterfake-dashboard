import { z } from "zod";

// Error types
export type ErrorType =
  | "validation"
  | "network"
  | "auth"
  | "server"
  | "unknown";

export interface AppError {
  type: ErrorType;
  message: string;
  messages?: string[]; // Multiple error messages array
  details?: any;
  originalError?: any;
  response?: {
    status: number;
  };
}

// Convert Zod errors to user-friendly messages
export const formatZodError = (error: z.ZodError): string => {
  const messages: string[] = [];

  error.errors.forEach((err) => {
    let message = err.message;
    let path = err.path.join(".");

    const fieldName = path || "Field";

    switch (err.code) {
      case "too_small":
        if (err.type === "string") {
          message = `${fieldName} must be at least ${err.minimum} characters`;
        }
        break;
      case "too_big":
        if (err.type === "string") {
          message = `${fieldName} must be at most ${err.maximum} characters`;
        }
        break;
      case "invalid_string":
        if (err.validation === "email") {
          message = "Please enter a valid email address";
        }
        break;
      case "invalid_type":
        message = `${fieldName} is ${err.received} but it should be ${err.expected}`;
        break;
      case "invalid_literal":
        message = `${fieldName} has an invalid value`;
        break;
      default:
        // Use the original message if we don't have a custom one
        message = err.message || "Invalid value";
    }

    messages.push(message);
  });

  return messages.length === 1 ? messages[0] : messages.join("\n");
};

// Get formatted error messages as array
export const formatZodErrorAsArray = (error: z.ZodError): string[] => {
  const messages: string[] = [];

  error.errors.forEach((err) => {
    let message = err.message;
    let path = err.path.join(".");

    const fieldName = path || "Field";

    switch (err.code) {
      case "too_small":
        if (err.type === "string") {
          message = `${fieldName} must be at least ${err.minimum} characters`;
        }
        break;
      case "too_big":
        if (err.type === "string") {
          message = `${fieldName} must be at most ${err.maximum} characters`;
        }
        break;
      case "invalid_string":
        if (err.validation === "email") {
          message = "Please enter a valid email address";
        }
        break;
      case "invalid_type":
        message = `${fieldName} is required`;
        break;
      case "invalid_literal":
        message = `${fieldName} has an invalid value`;
        break;
      default:
        // Use the original message if we don't have a custom one
        message = err.message || "Invalid value";
    }

    messages.push(message);
  });

  return messages;
};

// Main error handler class
export class ErrorHandler {
  // Determine error type
  static determineErrorType(error: any): ErrorType {
    if (error instanceof z.ZodError) return "validation";
    if (error?.response?.status === 401 || error?.response?.status === 403)
      return "auth";
    if (error?.response?.status >= 500) return "server";
    if (error?.code === "NETWORK_ERROR" || !navigator.onLine) return "network";
    return "unknown";
  }

  // Handle and show error
  static handle(error: any, context?: string): AppError {
    const errorType = this.determineErrorType(error);
    let message = "";
    let details = null;

    let messages: string[] | undefined;
    const response = {
      status: error?.response?.status,
    };

    switch (errorType) {
      case "validation":
        const zodError = error as z.ZodError;
        message = formatZodError(zodError);
        messages = formatZodErrorAsArray(zodError);
        details = zodError.errors;
        break;

      case "auth":
        message = error?.response?.data?.message || "Authentication error";
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          message = "Invalid credentials";
        }
        break;

      case "network":
        message = "Network connection error. Please check your connection";
        break;

      case "server":
        message = "Server error. Please try again later";
        break;

      default:
        message = error?.message || "An unexpected error occurred";
    }

    const appError: AppError = {
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

  static validateAndHandle<T>(
    schema: z.ZodSchema<T>,
    data: unknown,
    context?: string
  ) {
    try {
      return schema.parse(data);
    } catch (error) {
      ErrorHandler.handle(error, context);
      return null;
    }
  }
}
