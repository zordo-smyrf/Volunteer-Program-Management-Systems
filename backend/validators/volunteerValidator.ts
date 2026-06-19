import { z } from "zod";

export const volunteerSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  age: z.number().min(16).max(100),
  projectId: z.string(),
});