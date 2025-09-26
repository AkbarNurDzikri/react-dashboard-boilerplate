import { resendVerifyEmailSchema } from "@/features/resend-verify-email/schemas/resend-verify-email.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const useResendVerifyEmail = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(resendVerifyEmailSchema),
  });

  return form;
};

export default useResendVerifyEmail;
