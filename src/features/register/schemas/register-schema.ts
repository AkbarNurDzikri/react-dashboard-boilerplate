import z from "zod";

export const registerSchema = z
  .object({
    email: z.email().min(1),
    name: z.string().min(1),
    password: z.string().min(1).min(6),
    confirmPassword: z.string().min(1).min(6),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Confirm password must be the same as password",
        path: ["confirmPassword"],
      });
    }
  });
