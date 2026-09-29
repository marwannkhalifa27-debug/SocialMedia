import z from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2).max(50),
  username: z.string().min(8).max(20).trim().toLowerCase(),
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  sex: z.enum(["male", "female"]).optional(),
  age: z.number().min(18).max(60),
  phone: z.string().trim(),
});

export const loginSchema = z.object({
  email: z.email().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;