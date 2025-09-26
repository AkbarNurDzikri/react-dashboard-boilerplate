import type { Dispatch, SetStateAction } from "react";
import type { IResetPassword } from "./reset-password.interface";
import { type NavigateFn } from "@tanstack/react-router";

export interface IResetPasswordServiceProps {
  data: IResetPassword & { token: string };
  showSuccess: (msg: string) => void;
  showError: (msg: string) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  navigate: NavigateFn;
}
