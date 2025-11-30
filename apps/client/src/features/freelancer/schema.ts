import { z } from "zod";

export const freelancerProfileSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  bio: z.string().min(50, "Bio must be at least 50 characters long."),
  experienceLevel: z.enum(["Entry-level", "Intermediate", "Expert"], {
    errorMap: () => ({ message: "Please select an experience level." }),
  }),
  servicesOffered: z
    .string()
    .min(5, "Services offered must be at least 5 characters long.")
    .transform((val) =>
      val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  rate: z.coerce.number().positive("Rate must be a positive number."),
  availability: z.enum(["Full-time", "Part-time", "As needed"], {
    errorMap: () => ({ message: "Please select your availability." }),
  }),
  keySkills: z // Renamed from 'skills'
    .string()
    .min(5, "Key skills must be at least 5 characters long.")
    .transform((val) =>
      val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  portfolioUrl: z
    .string()
    .url("Invalid URL format.")
    .optional()
    .or(z.literal("")),
});

export type FreelancerProfileSchema = z.infer<typeof freelancerProfileSchema>;
