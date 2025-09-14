import { z } from "zod";

// Convert Zod errors to user-friendly messages
export const formatZodError = (error: z.ZodIssue): string => {
  let message = error.message;
  let path = error.path.join(".");

  const fieldName = path || "Field";

  switch (error.code) {
    case "too_small":
      if (error.type === "string") {
        message = `${fieldName} must be at least ${error.minimum} characters`;
      }
      break;
    case "too_big":
      if (error.type === "string") {
        message = `${fieldName} must be at most ${error.maximum} characters`;
      }
      break;
    case "invalid_string":
      if (error.validation === "email") {
        message = "Please enter a valid email address";
      } else message = error.message;
      break;
    case "invalid_type":
      message = `${fieldName} is ${error.received} but it should be ${error.expected}`;
      break;
    case "invalid_literal":
      message = `${fieldName} has an invalid value`;
      break;
    default:
      // Use the original message if we don't have a custom one
      message = error.message || "Invalid value";
  }

  return message;
};

// Get formatted error messages as array
export const formatZodErrorAsArray = (error: z.ZodError): string[] => {
  const messages: string[] = [];

  error.errors.forEach((err) => {
    const message = formatZodError(err);

    messages.push(message);
  });

  return messages;
};
