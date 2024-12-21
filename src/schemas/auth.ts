import {z} from "zod";

export const RegistrationSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().min(6, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be of length greater than 6"),
    role: z.string(z.enum(["user", "publisher"])).min(1,"Role is required"),
  });