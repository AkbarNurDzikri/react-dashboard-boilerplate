import { toast } from "sonner";

export type FlashMessageType = "success" | "error" | "warning" | "info";

export interface FlashMessageOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  style?: "default" | "rich";
}

class FlashMessageService {
  show(
    message: string,
    type: FlashMessageType = "info",
    options: FlashMessageOptions = {}
  ) {
    const { duration = 5000, action, style = "rich" } = options;

    const config = {
      duration,
      richColors: style === "rich",
      ...(action && {
        action: {
          label: action.label,
          onClick: action.onClick,
        },
      }),
    };

    switch (type) {
      case "success":
        toast.success(message, config);
        break;
      case "error":
        toast.error(message, config);
        break;
      case "warning":
        toast.warning(message, config);
        break;
      case "info":
        toast.info(message, config);
        break;
      default:
        toast(message, config);
    }
  }

  success(message: string, options?: FlashMessageOptions) {
    this.show(message, "success", options);
  }

  error(message: string, options?: FlashMessageOptions) {
    this.show(message, "error", options);
  }

  warning(message: string, options?: FlashMessageOptions) {
    this.show(message, "warning", options);
  }

  info(message: string, options?: FlashMessageOptions) {
    this.show(message, "info", options);
  }

  // Untuk API errors
  apiError(error: unknown, defaultMessage?: string) {
    let message = defaultMessage || "Something wrong";

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    }

    this.error(message, {
      duration: 7000,
    });
  }

  // Untuk success actions
  actionSuccess(actionName: string) {
    this.success(`${actionName} success!`);
  }

  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) {
    return toast.promise(promise, messages);
  }
}

export const flashMessage = new FlashMessageService();
