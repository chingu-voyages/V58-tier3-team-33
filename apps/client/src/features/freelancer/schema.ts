import { z } from "zod";

export const freelancerProfileSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),

  experienceLevel: z.enum(
    ["Emerging", "Developing", "Proficient", "Advanced", "Expert"],
    {
      message: "Please select an experience level.",
    },
  ),

  keySkills: z.array(z.string()).min(1, "Please list at least one skill."),

  portfolioUrl: z
    .string()
    .url("Invalid URL format.")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .min(0, "Bio must be at least 0 characters long.")
    .max(500, "Bio cannot exceed 500 characters.")
    .optional(),
});

export type FreelancerProfileSchema = z.infer<typeof freelancerProfileSchema>;
