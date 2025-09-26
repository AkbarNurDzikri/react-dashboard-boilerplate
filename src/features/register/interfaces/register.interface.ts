import type z from "zod";
import type { registerSchema } from "../schemas/register-schema";

export type IRegister = z.infer<typeof registerSchema>;
