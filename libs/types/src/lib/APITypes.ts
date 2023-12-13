export interface ApiResponse<T> {
  success: boolean;
  errorMessage: string;
  data?: T;
}

export type LoginRequestT = {
  email: string;
  password: string;
};

export type LoginResponseT = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: string;
    passwordHash: string;
  };
  jwt: string;
};
