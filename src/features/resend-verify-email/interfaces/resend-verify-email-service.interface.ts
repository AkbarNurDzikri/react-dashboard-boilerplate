import type { Dispatch, SetStateAction } from "react";
import type { IResendVerifyEmail } from "./resend-verify-email.interface";

export interface IResendVerifyEmailService {
  data: IResendVerifyEmail;
  showSuccess: (msg: string) => void;
  showError: (msg: string) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
