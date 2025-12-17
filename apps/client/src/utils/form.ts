import { z, type ZodRawShape } from "zod";

export const calculateProgress = <T extends ZodRawShape>(
  values: Record<string, unknown>,
  schema: z.ZodObject<T>,
  fieldsToExclude: string[] = [],
): number => {
  const shape = schema.shape;
  let completedFields = 0;
  let totalFields = 0;

  for (const key in shape) {
    if (fieldsToExclude.includes(key)) continue;
    totalFields++;
    const fieldSchema = shape[key];
    if (fieldSchema instanceof z.ZodType) {
      if (fieldSchema.safeParse(values[key]).success) {
        completedFields++;
      }
    }
  }

  if (totalFields === 0) return 0;
  return (completedFields / totalFields) * 100;
};
