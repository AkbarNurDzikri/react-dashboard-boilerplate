import type { Dispatch, SetStateAction } from "react";
import type { ILogin } from "./login.interface";
import { type NavigateFn } from "@tanstack/react-router";

export interface LoginServiceProps {
  data: ILogin;
  showSuccess: (msg: string) => void;
  showError: (msg: string) => void;
  navigate: NavigateFn;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
