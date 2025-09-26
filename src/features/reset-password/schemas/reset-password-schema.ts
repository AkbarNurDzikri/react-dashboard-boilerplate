import z from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(1).min(6),
    confirmNewPassword: z.string().min(1).min(6),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Confirm password must be the same as password",
        path: ["confirmNewPassword"],
      });
    }
  });
