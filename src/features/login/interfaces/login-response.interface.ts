export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    user: {
      email: string;
      id: string;
      name: string;
      permissions: string[];
      roles: string[];
    };
  };
}
