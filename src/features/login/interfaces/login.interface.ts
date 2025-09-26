import type z from "zod";
import type { loginSchema } from "../schemas/login-schema";

export type ILogin = z.infer<typeof loginSchema>;
