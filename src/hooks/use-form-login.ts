import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../features/login/schemas/login-schema";
import type { ILogin } from "../features/login/interfaces/login.interface";

const useFormLogin = () => {
  const form = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  return form;
};
export default useFormLogin;
