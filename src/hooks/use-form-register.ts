import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../features/register/schemas/register-schema";
import type { IRegister } from "../features/register/interfaces/register.interface";

const useFormRegister = () => {
  const form = useForm<IRegister>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  return form;
};
export default useFormRegister;
