import { z } from "zod";

// Base schema with all possible fields
const authSchema = z.object({
  fullname: z.string().trim().min(1, { message: "Full name is required" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[a-z])/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least one number.",
    })
    .regex(new RegExp("^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/\\?])"), {
      message: "Password must contain at least one special character.",
    }),
  userType: z.enum(["freelancer", "client"]),
  termsAgreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

// Schema for registration form
export const registerSchema = authSchema.pick({
  fullname: true,
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
