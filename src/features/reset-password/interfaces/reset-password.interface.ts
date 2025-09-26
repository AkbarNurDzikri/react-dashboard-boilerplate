import type z from "zod";
import type { resetPasswordSchema } from "../schemas/reset-password-schema";

export type IResetPassword = z.infer<typeof resetPasswordSchema>;
