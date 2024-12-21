import { z } from "zod";

export const schema = z.object({
  title: z.string().min(3, "Course title is required"),
  description: z.string().min(6, "Description is required"),
  weeks: z.string().min(1, "Number of weeks is required"),
  tuition: z.string().min(1, "Tuition fees  is required"),
  minimumSkill: z.enum(["beginner", "intermediate", "advanced"]),
  scholarshipAvailable: z.boolean(),
});
