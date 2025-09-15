// Error types
export type ErrorType =
  | "validation"
  | "network"
  | "auth"
  | "server"
  | "client"
  | "unknown";

export interface AppErrorResult {
  type: ErrorType;
  message: string;
  messages?: string[]; // Multiple error messages array
  details?: any;
  originalError?: any;
  response?: {
    status: number;
  };
}
