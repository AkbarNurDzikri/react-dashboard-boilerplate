import { ApiService } from "@/services/api.service";
import type { IRegisterServiceProps } from "../interfaces/register-service.interface";
import type { IRegisterResponse } from "../interfaces/register-response.interface";

const registerService = async ({
  data,
  showError,
  showSuccess,
  setLoading,
}: IRegisterServiceProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...sanitized } = data;
  setLoading(true);

  try {
    const response = await ApiService.post<IRegisterResponse>(
      "auth/register",
      sanitized
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

export default registerService;
