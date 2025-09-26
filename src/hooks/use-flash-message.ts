import { useCallback } from "react";
import { flashMessage } from "@/services/flash-message.service";

export function useFlashMessage() {
  const showSuccess = useCallback((message: string) => {
    flashMessage.success(message);
  }, []);

  const showError = useCallback((error: unknown, defaultMessage?: string) => {
    flashMessage.apiError(error, defaultMessage);
  }, []);

  const showApiError = useCallback(
    (error: unknown) => {
      showError(error, "Something wrong");
    },
    [showError]
  );

  const showActionSuccess = useCallback((actionName: string) => {
    flashMessage.actionSuccess(actionName);
  }, []);

  const handleApiCall = useCallback(
    async <T>(
      apiCall: Promise<T>,
      options: {
        successMessage?: string;
        errorMessage?: string;
        actionName?: string;
      } = {}
    ): Promise<T | null> => {
      try {
        const result = await apiCall;

        if (options.successMessage) {
          flashMessage.success(options.successMessage);
        } else if (options.actionName) {
          flashMessage.actionSuccess(options.actionName);
        }

        return result;
      } catch (error) {
        flashMessage.apiError(error, options.errorMessage);
        return null;
      }
    },
    []
  );

  return {
    showSuccess,
    showError,
    showApiError,
    showActionSuccess,
    handleApiCall,
  };
}
