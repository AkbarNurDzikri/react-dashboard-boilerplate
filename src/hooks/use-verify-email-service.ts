import type { IVerifyEmailServiceProps } from "@/features/verify-email/interfaces/verify-email-service.interface";
import { ApiService } from "@/services/api.service";
import type { IVerifyEmailResponse } from "../features/verify-email/interfaces/verify-email-response.interface";
import { useNavigate } from "@tanstack/react-router";
import { useFlashMessage } from "./use-flash-message";
import { useEffect, useState } from "react";

const useVerifyEmailService = ({ token }: IVerifyEmailServiceProps) => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useFlashMessage();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    ApiService.post<IVerifyEmailResponse>("auth/verification/verify", { token })
      .then((response) => {
        if (response.success) {
          setIsSuccess(true);
          showSuccess(String(response.message));
          setTimeout(() => {
            navigate({ to: "/login" });
          }, 3000);
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        showError(String(err instanceof Error ? err.message : err));
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return { loading, isSuccess };
};

export default useVerifyEmailService;
