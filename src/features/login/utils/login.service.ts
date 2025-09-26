import { ApiService } from "@/services/api.service";
import type { LoginServiceProps } from "../interfaces/login-service.interface";
import type { ILoginResponse } from "../interfaces/login-response.interface";

const loginService = async ({
  data,
  showError,
  showSuccess,
  navigate,
  setLoading,
}: LoginServiceProps) => {
  setLoading(true);

  try {
    const response = await ApiService.post<ILoginResponse>("auth/login", data);
    if (response.success) {
      showSuccess(String(response.message));
      navigate({ to: "/dashboard" });
    }
  } catch (err) {
    showError(String(err instanceof Error ? err.message : err));
  } finally {
    setLoading(false);
  }
};

export default loginService;
