import type { Dispatch, SetStateAction } from "react";
import type { IRegister } from "./register.interface";

export interface IRegisterServiceProps {
  data: IRegister;
  showSuccess: (msg: string) => void;
  showError: (msg: string) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
