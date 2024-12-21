import { z } from "zod";

export const schema = z.object({
  name: z.string().min(3, "Bootcamp name is required"),
  description: z.string().min(6, "Description is required"),
  website: z.string().min(1, "Website url is required").url(),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().min(6, "Email is required").email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  careers: z
    .array(
      z.enum([
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Blockchain",
        "Software Testing",
        "Devops",
      ])
    )
    .min(1, "At least one option must be selected"),
  housing: z.boolean(),
  jobAssistance: z.boolean(),
  jobGuarantee: z.boolean(),
  acceptGi: z.boolean(),
  cost: z.string(),
});
