import type z from "zod";
import type { resendVerifyEmailSchema } from "../schemas/resend-verify-email.schema";

export type IResendVerifyEmail = z.infer<typeof resendVerifyEmailSchema>;
