import { ApiService } from "@/services/api.service";
import type { IResendVerifyEmailResponse } from "../interfaces/resend-verify-email-response.interface";
import type { IResendVerifyEmailService } from "../interfaces/resend-verify-email-service.interface";

const resendVerifyEmailService = async ({
  data,
  showError,
  showSuccess,
  setLoading,
}: IResendVerifyEmailService) => {
  setLoading(true);

  try {
    const response = await ApiService.post<IResendVerifyEmailResponse>(
      "auth/verification/resend",
      data
    );

    if (response.success) {
      showSuccess(String(response.message));
    }
  } catch (err) {
    showError(String(err instanceof Error ? err.message : err));
  } finally {
    setLoading(false);
  }
};

export default resendVerifyEmailService;
