import type { Dispatch, SetStateAction } from "react";
import type { IForgotPassword } from "./forgot-password.interface";

export interface IForgotPasswordService {
  data: IForgotPassword;
  showSuccess: (msg: string) => void;
  showError: (msg: string) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
