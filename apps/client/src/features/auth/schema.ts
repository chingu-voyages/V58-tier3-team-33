import { z } from "zod";

// Base schema with all possible fields
const authSchema = z.object({
  name: z.string().trim().min(3, { message: "Display name is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  userType: z.enum(["freelancer", "client"]),
  termsAgreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

// Schema for registration form
export const registerSchema = authSchema.pick({
  name: true,
  email: true,
  password: true,
  userType: true,
  termsAgreement: true,
});

// Schema for login form
export const loginSchema = authSchema.pick({
  email: true,
  password: true,
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
