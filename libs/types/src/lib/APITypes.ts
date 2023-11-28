import { User } from './ObjectTypes';

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

export interface DecodedToken {
  // Define the properties you expect in the decoded token
  userId: string;
  // ... other properties
}

export interface Product {
  id: string;
  name: string;
  price: number;
}
