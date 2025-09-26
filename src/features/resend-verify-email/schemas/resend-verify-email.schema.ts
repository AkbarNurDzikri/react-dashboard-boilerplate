import z from "zod";

export const resendVerifyEmailSchema = z.object({
  email: z.email().min(1),
});
