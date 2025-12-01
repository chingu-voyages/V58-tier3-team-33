import { z } from "zod";

export const freelancerProfileSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long.'),
  experienceLevel: z.enum(['Entry-level', 'Intermediate', 'Expert'], {
    message: 'Please select an experience level.',
  }),
  servicesOffered: z
    .array(z.string())
    .min(1, 'Please list at least one service.'),

  rate: z.number().positive('Rate must be a positive number.'),

  availability: z.enum(['Full-time', 'Part-time', 'As needed'], {
    message: 'Please select your availability.',
  }),

  keySkills: z.array(z.string()).min(1, 'Please list at least one skill.'),

  portfolioUrl: z
    .string()
    .url("Invalid URL format.")
    .optional()
    .or(z.literal("")),
});

export type FreelancerProfileSchema = z.infer<typeof freelancerProfileSchema>;
