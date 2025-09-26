import { forgotPasswordSchema } from "@/features/forgot-password/schemas/forgot-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const useFormForgotPassword = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  return form;
};

export default useFormForgotPassword;
