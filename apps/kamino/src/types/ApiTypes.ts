import { User } from "./ObjectTypes";

export interface APIResponse {
  success: boolean;
  errorMessage: string;
}

export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface LoginResponse extends APIResponse {
  data: {
    user: User;
    jwt: string;
  };
}
