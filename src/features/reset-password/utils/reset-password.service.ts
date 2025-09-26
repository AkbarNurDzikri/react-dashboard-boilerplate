import { ApiService } from "@/services/api.service";
import type { IResetPasswordServiceProps } from "../interfaces/reset-password-service.interface";
import type { IResetPasswordResponse } from "../interfaces/reset-password-response.interface";

const resetPasswordService = async ({
  data,
  showError,
  showSuccess,
  setLoading,
  navigate,
}: IResetPasswordServiceProps) => {
  setLoading(true);

  const fixedData = {
    token: data.token,
    newPassword: data.newPassword,
  };

  try {
    const response = await ApiService.post<IResetPasswordResponse>(
      "auth/password/reset",
      fixedData
    );
    if (response.success) {
      showSuccess(String(response.message));
      navigate({ to: "/login" });
    }
  } catch (err) {
    showError(String(err instanceof Error ? err.message : err));
  } finally {
    setLoading(false);
  }
};

export default resetPasswordService;
