import { ApiService } from "@/services/api.service";
import type { IForgotPasswordResponse } from "../interfaces/forgot-password-response.interface";
import type { IForgotPasswordService } from "../interfaces/forgot-password-service.interface";

const forgotPasswordService = async ({
  data,
  showError,
  showSuccess,
  setLoading,
}: IForgotPasswordService) => {
  setLoading(true);

  try {
    const response = await ApiService.post<IForgotPasswordResponse>(
      "auth/password/forgot",
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

export default forgotPasswordService;
