import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  location: z.string().min(2),
  isActive: z.boolean(),
  startDate: z.string(),
});