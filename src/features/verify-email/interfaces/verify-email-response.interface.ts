export interface IVerifyEmailResponse {
  sucess: boolean;
  message: string;
  data: { userId: string };
}
