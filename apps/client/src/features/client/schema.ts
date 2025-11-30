import { z } from "zod";

export const gigSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  budgetRange: z.string().min(1, "Budget range is required"),
  timelineDeadline: z.string().min(1, "Timeline/Deadline is required"),
  requiredSkills: z.array(z.string()).optional(),
});

export type GigSchema = z.infer<typeof gigSchema>;
