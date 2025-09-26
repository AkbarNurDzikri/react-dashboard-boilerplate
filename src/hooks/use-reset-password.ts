import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/features/reset-password/schemas/reset-password-schema";
import type { IResetPassword } from "@/features/reset-password/interfaces/reset-password.interface";

const useResetPassword = () => {
  const form = useForm<IResetPassword>({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  return form;
};
export default useResetPassword;
