import { z } from "zod";

// Email validation schema
export const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(1, "Email is required");

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    "Password must contain uppercase, lowercase, number and special character"
  );

// Login validation schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  dashboardType: z.enum(["admin", "user"]).optional(),
});

// Register validation schema
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    dashboardType: z.enum(["admin", "user"]).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Session validation helpers
export function isValidEmail(email: string): boolean {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
}

export function isValidPassword(password: string): boolean {
  try {
    passwordSchema.parse(password);
    return true;
  } catch {
    return false;
  }
}

export function validateLoginData(data: any) {
  try {
    return { data: loginSchema.parse(data), error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export function validateRegisterData(data: any) {
  try {
    return { data: registerSchema.parse(data), error: null };
  } catch (error) {
    return { data: null, error };
  }
}

// Sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim();
}
